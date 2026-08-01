const quoteBtn = document.querySelector(".quote-btn");
const quoteModal = document.querySelector(".quote-modal");
const closeQuote = document.querySelector(".close-quote");

if (quoteBtn) {
    quoteBtn.addEventListener("click", () => {
        quoteModal.classList.add("active");
    });
}

if (closeQuote) {
    closeQuote.addEventListener("click", () => {
        quoteModal.classList.remove("active");
    });
}

quoteModal.addEventListener("click", (e) => {
    if (e.target === quoteModal) {
        quoteModal.classList.remove("active");
    }
});

document.getElementById("sendWhatsapp").addEventListener("click", () => {

    const name = document.getElementById("customerName").value;
    const company = document.getElementById("companyName").value;
    const phone = document.getElementById("phoneNumber").value;
    const message = document.getElementById("customerMessage").value;

    const text = `Hello KVID,

Name: ${name}
Company: ${company}
Phone: ${phone}

Requirement:
${message}`;

    window.open(
        `https://wa.me/917411196731?text=${encodeURIComponent(text)}`,
        "_blank"
    );
});