const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array(columns).fill(0);
const chars = ["0", "1"]; // Nur 0 und 1

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Hintergrund leicht transparent
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Grüne Schrift
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    // Rekursiver Timeout für langsameres Zeichnen
    setTimeout(draw, 60); // 50 ms Verzögerung
}

// Zeichnung starten
draw();
