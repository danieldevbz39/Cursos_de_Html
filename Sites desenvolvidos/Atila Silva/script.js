// 1. Sistema de Detecção Online/Offline
function updateOnlineStatus() {
    const contingencyBar = document.getElementById('offlineNoticeBar');
    const statusBar = document.getElementById('siteStatusBar');
    if (!contingencyBar || !statusBar) return;
    if (!navigator.onLine) {
        contingencyBar.classList.remove('hidden');
        statusBar.classList.add('hidden');
    } else {
        contingencyBar.classList.add('hidden');
        statusBar.classList.remove('hidden');
    }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// 3. Fallback / Contingência do WhatsApp
let lastPendingMessage = '';

function handleWhatsAppContact(customMessage) {
    lastPendingMessage = customMessage;
    if (!navigator.onLine) {
        openOfflineModal();
        return;
    }
    try {
        const encoded = encodeURIComponent(customMessage);
        const url = `https://wa.me/5534999295603?text=${encoded}`;
        const newWin = window.open(url, '_blank');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            // Bloqueio de Pop-up
            openOfflineModal();
        }
    } catch (err) {
        openOfflineModal();
    }
}

function openOfflineModal() {
    const modal = document.getElementById('offlineContactModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function closeOfflineModal() {
    const modal = document.getElementById('offlineContactModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function retryConnection() {
    closeOfflineModal();
    if (lastPendingMessage) {
        handleWhatsAppContact(lastPendingMessage);
    }
}

function copyToClipboard(text) {
    if (!navigator.clipboard) {
        prompt('Copie o número:', text);
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        alert('Número copiado com sucesso: ' + text);
    }).catch(() => {
        prompt('Copie o número:', text);
    });
}

// 4. Toggle Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('hidden') === false;
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

function toggleMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

// 5. Simulação Interativa no Mockup do Smartphone
let isVehicleLocked = false;

function simulateVehicleLock() {
    const btn = document.getElementById('vehicleIgnitionButton');
    const btnText = document.getElementById('vehicleLockButtonText');
    const statusLabel = document.getElementById('appVehicleStatus');
    const msg = document.getElementById('vehicleMockStatus');
    if (!btn || !btnText || !statusLabel || !msg || btn.disabled) return;

    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');

    if (!isVehicleLocked) {
        btnText.textContent = 'COMANDO ENVIADO...';
        btn.classList.remove('bg-rose-600', 'hover:bg-rose-700');
        btn.classList.add('bg-slate-700');

        setTimeout(() => {
            isVehicleLocked = true;
            btnText.textContent = 'DESBLOQUEAR VEÍCULO';
            btn.classList.remove('bg-slate-700');
            btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
            statusLabel.textContent = 'Bloqueio Ativo (Corte de Ignição)';
            statusLabel.className = 'bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold';
            msg.textContent = 'Comando concluído com resposta do satélite em 2s!';
            msg.className = 'text-[11px] text-center text-emerald-400 font-bold h-4';
            btn.disabled = false;
            btn.removeAttribute('aria-busy');
        }, 900);
    } else {
        btnText.textContent = 'LIBERANDO...';
        btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        btn.classList.add('bg-slate-700');

        setTimeout(() => {
            isVehicleLocked = false;
            btnText.textContent = 'BLOQUEAR VEÍCULO AGORA';
            btn.classList.remove('bg-slate-700');
            btn.classList.add('bg-rose-600', 'hover:bg-rose-700');
            statusLabel.textContent = 'Ignição Ligada';
            statusLabel.className = 'bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold';
            msg.textContent = 'Veículo liberado para partida com sucesso.';
            msg.className = 'text-[11px] text-center text-slate-400 font-medium h-4';
            btn.disabled = false;
            btn.removeAttribute('aria-busy');
        }, 900);
    }
}

// 6. Filtro de Categorias de Veículos
function filterVehicles(cat, selectedButton) {
    document.querySelectorAll('.vehicleFilterButton').forEach(btn => {
        btn.className = 'vehicleFilterButton bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full transition border border-slate-200';
    });
    if (selectedButton) {
        selectedButton.className = 'vehicleFilterButton active bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full transition';
    }

    const cards = document.querySelectorAll('.vehicleCard');
    cards.forEach(card => {
        if (cat === 'all' || card.classList.contains(cat)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 7. Filtro de Depoimentos
function filterReviews(cat, selectedButton) {
    document.querySelectorAll('.reviewFilterButton').forEach(btn => {
        btn.className = 'reviewFilterButton bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition';
    });
    if (selectedButton) {
        selectedButton.className = 'reviewFilterButton active bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full transition';
    }

    const cards = document.querySelectorAll('.reviewCard');
    cards.forEach(card => {
        if (cat === 'all' || card.classList.contains(cat)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 8. Simulador de Cotação
function generateQuote(e) {
    e.preventDefault();
    const type = document.getElementById('quoteVehicleType').value;
    const model = document.getElementById('quoteModel').value.trim();
    const name = document.getElementById('quoteName').value.trim();
    const service = document.getElementById('quoteService').value;

    const formattedMsg = `*SIMULAÇÃO DE COTAÇÃO - SITE*\n` +
        `• *Nome:* ${name}\n` +
        `• *Tipo:* ${type}\n` +
        `• *Modelo/Ano:* ${model}\n` +
        `• *Serviço de Interesse:* ${service}\n\n` +
        `Olá Átila Silva, gostaria de receber a proposta deste veículo.`;

    handleWhatsAppContact(formattedMsg);
    e.target.reset();
}

// 9. Scroll Reveal (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal-elem').forEach(el => observer.observe(el));