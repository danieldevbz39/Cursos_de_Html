// 1. Inicialização de Ícones
if (window.lucide) {
    lucide.createIcons();
}

// 2. Sistema de Detecção Online/Offline
function updateOnlineStatus() {
    const contingencyBar = document.getElementById("contingency-bar");
    const statusBar = document.getElementById("status-bar");
    if (!contingencyBar || !statusBar) return;
    if (!navigator.onLine) {
        contingencyBar.classList.remove("hidden");
        statusBar.classList.add("hidden");
    } else {
        contingencyBar.classList.add("hidden");
        statusBar.classList.remove("hidden");
    }
}
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

// 3. Fallback / Contingência do WhatsApp
let lastPendingMessage = "";

function handleWhatsAppContact(customMessage) {
    lastPendingMessage = customMessage;
    if (!navigator.onLine) {
        openOfflineModal();
        return;
    }
    try {
        const encoded = encodeURIComponent(customMessage);
        const url = `https://wa.me/5534999295603?text=${encoded}`;
        const newWin = window.open(url, "_blank");
        if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
            // Bloqueio de Pop-up
            openOfflineModal();
        }
    } catch (err) {
        openOfflineModal();
    }
}

function openOfflineModal() {
    const modal = document.getElementById("contingency-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
}

function closeOfflineModal() {
    const modal = document.getElementById("contingency-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
}

function retryConnection() {
    closeOfflineModal();
    if (lastPendingMessage) {
        handleWhatsAppContact(lastPendingMessage);
    }
}

function copyToClipboard(text) {
    if (!navigator.clipboard) {
        prompt("Copie o número:", text);
        return;
    }
    navigator.clipboard
        .writeText(text)
        .then(() => {
            alert("Número copiado com sucesso: " + text);
        })
        .catch(() => {
            prompt("Copie o número:", text);
        });
}

// 4. Toggle Mobile Menu
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("hidden") === false;
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

function toggleMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("hidden");
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
}

// 5. Simulação Interativa no Mockup do Smartphone
let isVehicleLocked = false;

function simulateVehicleLock() {
    const btn = document.getElementById("toggle-ignition-btn");
    const btnText = document.getElementById("lock-btn-text");
    const statusLabel = document.getElementById("app-vehicle-status");
    const msg = document.getElementById("mock-status-msg");
    if (!btn || !btnText || !statusLabel || !msg || btn.disabled) return;

    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");

    if (!isVehicleLocked) {
        btnText.textContent = "COMANDO ENVIADO...";
        btn.classList.remove("bg-rose-600", "hover:bg-rose-700");
        btn.classList.add("bg-slate-700");

        setTimeout(() => {
            isVehicleLocked = true;
            btnText.textContent = "DESBLOQUEAR VEÍCULO";
            btn.classList.remove("bg-slate-700");
            btn.classList.add("bg-emerald-600", "hover:bg-emerald-700");
            statusLabel.textContent = "Bloqueio Ativo (Corte de Ignição)";
            statusLabel.className =
                "bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold";
            msg.textContent = "Comando concluído com resposta do satélite em 2s!";
            msg.className = "text-[11px] text-center text-emerald-400 font-bold h-4";
            btn.disabled = false;
            btn.removeAttribute("aria-busy");
        }, 900);
    } else {
        btnText.textContent = "LIBERANDO...";
        btn.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
        btn.classList.add("bg-slate-700");

        setTimeout(() => {
            isVehicleLocked = false;
            btnText.textContent = "BLOQUEAR VEÍCULO AGORA";
            btn.classList.remove("bg-slate-700");
            btn.classList.add("bg-rose-600", "hover:bg-rose-700");
            statusLabel.textContent = "Ignição Ligada";
            statusLabel.className =
                "bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold";
            msg.textContent = "Veículo liberado para partida com sucesso.";
            msg.className = "text-[11px] text-center text-slate-400 font-medium h-4";
            btn.disabled = false;
            btn.removeAttribute("aria-busy");
        }, 900);
    }
}

// 6. Filtro de Categorias de Veículos
function filterVehicles(cat, selectedButton) {
    document.querySelectorAll(".vehicleFilterButton").forEach((btn) => {
        btn.className =
            "vehicleFilterButton bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full transition border border-slate-200";
    });
    if (selectedButton) {
        selectedButton.className =
            "vehicleFilterButton active bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full transition";
    }

    const cards = document.querySelectorAll(".vehicleCard");
    cards.forEach((card) => {
        const showCard = cat === "all" || card.classList.contains(cat);
        if (showCard) {
            card.classList.remove("hidden");
            card.classList.add("vehicle-card-grid-selected");
        } else {
            card.classList.add("hidden");
            card.classList.remove("vehicle-card-grid-selected");
        }
    });
}

// 7. Filtro de Depoimentos
function filterReviews(cat, selectedButton) {
    document.querySelectorAll(".reviewFilterButton").forEach((btn) => {
        btn.className =
            "reviewFilterButton bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition";
    });
    if (selectedButton) {
        selectedButton.className =
            "reviewFilterButton active bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition";
    }

    const cards = document.querySelectorAll(".reviewCard");
    cards.forEach((card) => {
        const showCard = cat === "all" || card.classList.contains(cat);
        if (showCard) {
            card.classList.remove("hidden");
            card.classList.add("review-card-active");
            card.classList.remove("review-card-muted");
        } else {
            card.classList.add("hidden");
            card.classList.remove("review-card-active");
            card.classList.add("review-card-muted");
        }
    });
}

// 8. Simulador de Cotação
function generateQuote(e) {
    e.preventDefault();

    const form = e.target;
    const type = document.getElementById("quoteVehicleType")?.value || "";
    const model = document.getElementById("quoteModel")?.value.trim() || "";
    const name = document.getElementById("quoteName")?.value.trim() || "";
    const service = document.getElementById("quoteService")?.value || "";

    if (!type || !model || !name || !service) {
        alert("Preencha todos os campos para gerar a proposta no WhatsApp.");
        return;
    }

    const formattedMsg =
        `*SIMULAÇÃO DE COTAÇÃO - SITE*\n` +
        `• *Nome:* ${name}\n` +
        `• *Tipo:* ${type}\n` +
        `• *Modelo/Ano:* ${model}\n` +
        `• *Serviço de Interesse:* ${service}\n\n` +
        `Olá Átila Silva, gostaria de receber a proposta deste veículo.`;

    handleWhatsAppContact(formattedMsg);
    form.reset();
}

function sendTechnicalForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const labels = {
        vehicles: "Categorias atendidas",
        compatibility: "Compatibilidade",
        fleet: "Pessoa física e frotas",
        coverage: "Cobertura",
        signal: "Tecnologia e sinal",
        update: "Atualização",
        lock: "Bloqueio seguro",
        safety: "Bloqueio em movimento",
        access: "Acesso do cliente",
        features: "Recursos do aplicativo",
        monitoring: "Monitoramento 24h",
        installation: "Local da instalação",
        time: "Tempo de instalação",
        warranty: "Garantia e parte elétrica",
        anatel: "Homologação e bateria",
        price: "Condições de preço",
        equipment: "Equipamento",
        contract: "Fidelidade e cancelamento",
        payment: "Pagamento",
        support: "Suporte técnico",
        resolution: "Prazo de resolução",
    };

    let message = "*FORMULÁRIO DE ALINHAMENTO TÉCNICO E COMERCIAL*\n";
    message += "*Átila Silva - Rastreamento e Bloqueio Veicular*\n\n";
    for (const [name, label] of Object.entries(labels)) {
        message += `• *${label}:* ${formData.get(name)}\n`;
    }

    handleWhatsAppContact(message);
}

const openTechnicalFormIframeButton = document.getElementById("openTechnicalFormIframe");
const technicalFormIframeWrapper = document.getElementById("technicalFormIframeWrapper");
const technicalFormIframe = document.getElementById("technicalFormIframe");
const technicalForm = document.getElementById("technicalForm");

if (openTechnicalFormIframeButton && technicalFormIframeWrapper && technicalFormIframe && technicalForm) {
    const technicalLabels = {
        vehicles: "Categorias atendidas",
        compatibility: "Compatibilidade",
        fleet: "Pessoa física e frotas",
        coverage: "Cobertura",
        signal: "Tecnologia e sinal",
        update: "Atualização",
        lock: "Bloqueio seguro",
        safety: "Bloqueio em movimento",
        access: "Acesso do cliente",
        features: "Recursos do aplicativo",
        monitoring: "Monitoramento 24h",
        installation: "Local da instalação",
        time: "Tempo de instalação",
        warranty: "Garantia e parte elétrica",
        anatel: "Homologação e bateria",
        price: "Condições de preço",
        equipment: "Equipamento",
        contract: "Fidelidade e cancelamento",
        payment: "Pagamento",
        support: "Suporte técnico",
        resolution: "Prazo de resolução",
    };

    const technicalFormMarkup = technicalForm.outerHTML
        .replace('onsubmit="sendTechnicalForm(event)"', '')
        .replace('class="hidden bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10"', 'class="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10"');

    const srcdoc = "<!doctype html>" +
        "<html lang='pt-BR'>" +
        "<head><meta charset='UTF-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' />" +
        "<style>" +
        "body { font-family: Arial, Helvetica, sans-serif; background: #eef6ff; color: #0f172a; margin: 0; padding: 24px; }" +
        ".form-wrap { max-width: 900px; margin: 0 auto; background: #fff; border-radius: 28px; padding: 28px; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12); border: 1px solid #cbd5e1; }" +
        "label { display: block; font-size: 12px; font-weight: 800; color: #334155; margin: 14px 0 8px; }" +
        "input, textarea { width: 100%; box-sizing: border-box; background: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px 12px; font-size: 13px; outline: none; }" +
        "textarea { min-height: 96px; resize: vertical; }" +
        "fieldset { border: 1px solid #deeaf3; border-radius: 18px; padding: 20px; margin-bottom: 18px; background: #f8fafc; }" +
        "legend { padding: 0 8px; font-size: 14px; font-weight: 900; color: #0f172a; }" +
        "button[type='submit'] { width: 100%; background: #2563eb; color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 14px; padding: 14px 24px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; transition: 0.2s ease; }" +
        "button[type='submit']:hover { background: #1d4ed8; }" +
        "</style></head>" +
        "<body><div class='form-wrap'>" + technicalFormMarkup + "</div>" +
        "<script>" +
        "const form = document.getElementById('technicalForm');" +
        "form.addEventListener('submit', function (event) {" +
        "  event.preventDefault();" +
        "  const formData = new FormData(form);" +
        "  const labels = " + JSON.stringify(technicalLabels) + ";" +
        "  let message = '*FORMULÁRIO DE ALINHAMENTO TÉCNICO E COMERCIAL*\\n';" +
        "  message += '*Átila Silva - Rastreamento e Bloqueio Veicular*\\n\\n';" +
        "  for (const [name, label] of Object.entries(labels)) {" +
        "    message += '• *' + label + ':* ' + formData.get(name) + '\\n';" +
        "  }" +
        "  parent.handleWhatsAppContact(message);" +
        "});" +
        "</script></body></html>";

    technicalFormIframe.srcdoc = srcdoc;

    openTechnicalFormIframeButton.addEventListener("click", () => {
        technicalFormIframeWrapper.classList.remove("hidden");
        technicalFormIframe.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

// 9. Scroll Reveal (Intersection Observer)
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1,
    },
);

document.querySelectorAll(".reveal-elem").forEach((el) => observer.observe(el));