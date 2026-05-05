/* ============================================
   ALZ101 — Role Selector
   ============================================
   Honest framing: this is a role picker, NOT real authentication.

   Why this module exists:
   - The user wanted "registration beyond dashboard" so the experience
     feels customized for clinicians vs patients vs caregivers.
   - This site is static (no backend), so we cannot do real auth —
     no password hashing, no email verification, no cross-device
     persistence. We are explicit about that in the modal copy.
   - We persist the choice in localStorage. This survives reloads on
     the same browser. It can be cleared by clicking "change role" or
     by clearing browser data.

   Behavior:
   - On any page other than the dashboard (index.html), if no role
     is stored, show a modal asking the user to pick a role.
   - The modal cannot be dismissed without making a choice — the
     user MUST self-identify before seeing the page content.
   - Once a role is set, it controls the body[data-audience] attribute
     and is reflected in the masthead chip.
   - The existing PHYSICIAN/PATIENT/CAREGIVER toggle buttons in the
     masthead remain functional and update this same value.
   ============================================ */

const NV_ROLE = (function () {
  const STORAGE_KEY = 'alz101_role';
  const STORAGE_NAME_KEY = 'alz101_display_name';

  const ROLES = [
    {
      id: 'phys',
      label: 'Physician / clinician',
      icon: '🩺',
      description:
        'Healthcare professional reviewing diagnostic, treatment, and trial data. Content is shown with full clinical detail (mechanism, dosing, efficacy data, monitoring schedules).',
      examples: 'MD · DO · NP · PA · neurologist · primary care · psychiatrist · pharmacist'
    },
    {
      id: 'pat',
      label: 'Patient / person living with dementia',
      icon: '🙂',
      description:
        'Reading to understand a diagnosis or concern about your own cognitive health. Content emphasizes plain-language explanations, lifestyle factors, and what to expect.',
      examples: 'Newly diagnosed · MCI · early-stage · concerned about symptoms'
    },
    {
      id: 'care',
      label: 'Caregiver / family member',
      icon: '🤝',
      description:
        'Caring for someone living with dementia. Content emphasizes practical day-to-day management, behavioral symptoms, support resources, and self-care.',
      examples: 'Spouse · adult child · paid caregiver · friend · neighbor'
    }
  ];

  /** Return the currently-stored role, or null. */
  function get() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getName() {
    try {
      return localStorage.getItem(STORAGE_NAME_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  /** Save the role and update the page. */
  function set(roleId, displayName) {
    try {
      localStorage.setItem(STORAGE_KEY, roleId);
      if (displayName) localStorage.setItem(STORAGE_NAME_KEY, displayName);
    } catch (e) { /* ignore */ }
    document.body.dataset.audience = roleId;
    window.dispatchEvent(new CustomEvent('nv-audience-change', { detail: roleId }));
    refreshChip();
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_NAME_KEY);
    } catch (e) { /* ignore */ }
  }

  /**
   * Page-gating logic: if we're on a non-dashboard page and there's
   * no role stored, show the modal and prevent interaction with the
   * underlying page until a choice is made.
   *
   * @param {Object} opts { force: boolean }  // if true, show modal regardless
   */
  function maybeGate(opts = {}) {
    const stored = get();
    if (stored && !opts.force) {
      // Just sync the body attribute and chip — no modal
      document.body.dataset.audience = stored;
      refreshChip();
      return;
    }
    // No role yet (or forced re-pick) → show the modal
    showModal({ allowClose: !!stored });
  }

  /** Build and show the role-selection modal. */
  function showModal(opts = {}) {
    // If already open, do nothing
    if (document.getElementById('roleGateOverlay')) return;

    const allowClose = !!opts.allowClose;

    const overlay = document.createElement('div');
    overlay.id = 'roleGateOverlay';
    overlay.className = 'role-gate-overlay';
    overlay.innerHTML = `
      <div class="role-gate-modal" role="dialog" aria-modal="true" aria-labelledby="roleGateTitle">
        ${allowClose ? '<button class="role-gate-close" id="roleGateClose" aria-label="Close">×</button>' : ''}

        <div class="role-gate-head">
          <div class="role-gate-tag">Tell us who you are</div>
          <h2 id="roleGateTitle">This helps us show the right level of detail</h2>
          <p class="role-gate-sub">
            ALZ101 customizes the language and depth of content for clinicians,
            patients, and caregivers. Pick the one that best describes you.
          </p>
        </div>

        <div class="role-gate-honesty">
          <strong>Honest note:</strong> This is a role selector, not a login.
          Your choice is saved to this browser only — no account is created,
          no password collected, no data sent anywhere. You can change your
          role any time using the chip in the top-right.
        </div>

        <div class="role-gate-options" id="roleGateOptions">
          ${ROLES.map(r => `
            <button type="button" class="role-card" data-role="${r.id}">
              <div class="role-card-head">
                <span class="role-card-icon" aria-hidden="true">${r.icon}</span>
                <span class="role-card-label">${r.label}</span>
              </div>
              <div class="role-card-desc">${r.description}</div>
              <div class="role-card-examples">${r.examples}</div>
            </button>
          `).join('')}
        </div>

        <div class="role-gate-name">
          <label for="roleGateName">
            <span class="role-gate-name-label">First name (optional)</span>
            <span class="role-gate-name-help">We'll use it to personalize headings. Stays in this browser only.</span>
          </label>
          <input type="text" id="roleGateName" maxlength="40" autocomplete="given-name"
                 placeholder="e.g. Jordan" value="${escapeHtml(getName())}" />
        </div>

        <div class="role-gate-foot">
          <button type="button" class="btn role-gate-confirm" id="roleGateConfirm" disabled>
            Continue →
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.classList.add('role-gate-active');

    let pickedRole = get() || null;
    const confirmBtn = document.getElementById('roleGateConfirm');

    function syncConfirm() {
      confirmBtn.disabled = !pickedRole;
    }
    syncConfirm();

    overlay.querySelectorAll('.role-card').forEach(card => {
      if (pickedRole === card.dataset.role) card.classList.add('is-picked');
      card.addEventListener('click', () => {
        overlay.querySelectorAll('.role-card').forEach(c => c.classList.remove('is-picked'));
        card.classList.add('is-picked');
        pickedRole = card.dataset.role;
        syncConfirm();
      });
    });

    confirmBtn.addEventListener('click', () => {
      if (!pickedRole) return;
      const name = document.getElementById('roleGateName').value.trim();
      set(pickedRole, name);
      closeModal();
    });

    if (allowClose) {
      document.getElementById('roleGateClose').addEventListener('click', closeModal);
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
      });
    }
  }

  function closeModal() {
    const overlay = document.getElementById('roleGateOverlay');
    if (!overlay) return;
    overlay.remove();
    document.body.classList.remove('role-gate-active');
  }

  /**
   * Render the masthead chip showing the current role.
   * Idempotent — safe to call repeatedly.
   */
  function refreshChip() {
    let chip = document.getElementById('roleChip');
    if (!chip) {
      const userRail = document.querySelector('.user-rail');
      if (!userRail) return;
      chip = document.createElement('button');
      chip.id = 'roleChip';
      chip.type = 'button';
      chip.className = 'role-chip';
      chip.title = 'Change role';
      userRail.insertBefore(chip, userRail.firstChild);
      chip.addEventListener('click', () => showModal({ allowClose: true }));
    }
    const role = get();
    if (!role) {
      chip.innerHTML = `<span class="role-chip-icon">👤</span> Pick role`;
      chip.classList.add('role-chip-empty');
      return;
    }
    chip.classList.remove('role-chip-empty');
    const meta = ROLES.find(r => r.id === role) || ROLES[0];
    const name = getName();
    chip.innerHTML = `
      <span class="role-chip-icon">${meta.icon}</span>
      <span class="role-chip-text">
        ${name ? escapeHtml(name) + ' · ' : ''}${meta.label.split(' / ')[0]}
      </span>
      <span class="role-chip-change">change</span>
    `;
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  return { get, getName, set, clear, maybeGate, showModal, refreshChip, ROLES };
})();

if (typeof window !== 'undefined') window.NV_ROLE = NV_ROLE;
