<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subisu Cable Net - Chandrauta Branch</title>
  <style>
    /* Highlight Subisu Cable Net Chandrapur Branch */
    .subisu-branch {
        background: linear-gradient(135deg, #6a0dad, #e60073); /* Purple-Pink Gradient */
        color: white;
        font-family: "Poppins", sans-serif;
        font-size: 1.3rem;
        font-weight: bold;
        text-align: center;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        margin: 20px auto;
        max-width: 500px;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 1s ease;
        cursor: pointer;
    }

    /* Hover Effect */
    .subisu-branch:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    /* Optional Glow */
    .glow {
        animation: glowPulse 2s infinite;
    }

    @keyframes glowPulse {
        0% { box-shadow: 0 0 10px #e60073, 0 0 20px #6a0dad; }
        50% { box-shadow: 0 0 25px #e60073, 0 0 45px #6a0dad; }
        100% { box-shadow: 0 0 10px #e60073, 0 0 20px #6a0dad; }
    }
  </style>
</head>
<body>

  <div id="subisuBox" class="subisu-branch">
    ✨ Subisu Cable Net - Chandrauta Branch ✨
  </div>

  <script>
    // Select the element
    const subisuBox = document.getElementById("subisuBox");

    // Toggle glowing effect on click
    subisuBox.addEventListener("click", () => {
      subisuBox.classList.toggle("glow");
    });

    // Auto animate text every 3 seconds
    setInterval(() => {
      subisuBox.innerHTML = "🚀 Subisu Cable Net - Chandrauta Branch 🚀";
      setTimeout(() => {
        subisuBox.innerHTML = "✨ Subisu Cable Net - Chandrauta Branch ✨";
      }, 1500);
    }, 3000);
  </script>

</body>
</html>