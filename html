<!--
Tienda-IA-estampados.html
Una plantilla completa (single-file) para una tienda estática + panel de IA para generar estampados
Cómo usar:
 1) Sube este archivo a GitHub y activa GitHub Pages (o usa Netlify / Cloudflare Pages).
 2) Para generar imágenes y enviar emails necesitarás (por seguridad) endpoints en un servidor o funciones serverless:
     - POST /api/generate-image  -> recibe { prompt, size } y devuelve { imageBase64 }
     - POST /api/send-email      -> recibe { toEmail, subject, htmlBody, attachmentBase64, filename }
 3) Abajo, dentro del mismo documento hay un ejemplo de servidor Node.js (Express) que implementa estos endpoints usando OpenAI (Images API) y nodemailer.
 4) Si NO quieres servidor: puedes usar servicios como EmailJS para envío de email (cliente a servicio) y la API de imágenes que elijas, pero NO expongas claves en frontend.

Importante: por razones de seguridad no pongas claves (API keys) en el frontend. Usa funciones serverless o un servidor pequeño.
-->

<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Tienda con IA - Estampados Personalizados</title>
  <style>
    :root{--accent:#0ea5a0;--bg:#f7f7fb}
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial;margin:0;background:var(--bg);color:#0f172a}
    .container{max-width:1100px;margin:28px auto;padding:16px}
    header{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
    .logo{font-weight:700;font-size:20px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
    .card{background:white;border-radius:10px;padding:14px;box-shadow:0 6px 18px rgba(2,6,23,.06)}
    .card img{width:100%;height:180px;object-fit:cover;border-radius:8px}
    .btn{background:var(--accent);color:white;padding:8px 12px;border-radius:8px;border:0;cursor:pointer}
    .cart{position:fixed;right:18px;bottom:18px;background:var(--accent);color:white;padding:12px 16px;border-radius:12px;box-shadow:0 8px 20px rgba(2,6,23,.18);cursor:pointer}
    .sidebar{position:fixed;right:0;top:0;height:100%;width:420px;background:white;box-shadow:-12px 0 40px rgba(2,6,23,.08);transform:translateX(110%);transition:transform .28s ease;padding:18px;overflow:auto}
    .sidebar.open{transform:translateX(0)}
    .chat{height:60vh;overflow:auto;border:1px solid #eef2f7;padding:10px;border-radius:8px;background:#fbfdff}
    .message{margin:8px 0;padding:8px 10px;border-radius:8px;max-width:85%}
    .user{background:#dcfce7;margin-left:auto}
    .bot{background:#eef2ff}
    .preview{max-width:100%;border-radius:8px;display:block;margin-top:12px}
    footer{margin-top:24px;text-align:center;color:#64748b}
    @media (max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}.sidebar{width:100%}}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">MiTienda - Estampados</div>
      <div>
        <button id="openAIChat" class="btn">Asistente de diseño</button>
      </div>
    </header>

    <main>
      <section>
        <h2>Productos</h2>
        <div id="products" class="grid" aria-live="polite"></div>
      </section>

      <section style="margin-top:18px">
        <h2>Tu carrito</h2>
        <div id="cartList"></div>
        <div id="cartTotal"></div>
        <button id="checkoutBtn" class="btn" style="margin-top:8px">Finalizar compra</button>
      </section>

      <footer>
        <small>Plantilla gratuita · Sube a GitHub Pages / Netlify / Cloudflare Pages</small>
      </footer>
    </main>
  </div>

  <button id="cartBtn" class="cart">🛒 <span id="cartCount">0</span></button>

  <!-- Sidebar: chat de IA + generador de imagen -->
  <aside id="aiSidebar" class="sidebar" aria-hidden="true">
    <h3>Asistente - Diseña tu estampado</h3>
    <div class="chat" id="chatBox"></div>

    <div style="margin-top:12px">
      <textarea id="userInput" rows="3" style="width:100%;border-radius:8px;padding:8px" placeholder="Describe el diseño que quieres: colores, estilo, texto, imagen, tamaño..."></textarea>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button id="sendMsg" class="btn">Enviar</button>
        <button id="generateImage" class="btn" style="background:#2563eb">Generar imagen</button>
        <button id="closeAI" class="btn" style="background:#94a3b8">Cerrar</button>
      </div>

      <div id="imageResultArea"></div>

      <hr style="margin-top:12px" />
      <h4>Al terminar</h4>
      <p>Cuando estés listo puedes enviar el diseño a tu correo y al nuestro para procesarlo como pedido.</p>
      <input id="customerEmail" placeholder="Tu correo" style="width:100%;padding:8px;border-radius:8px;border:1px solid #e6eef7;margin-top:6px" />
      <button id="sendToEmail" class="btn" style="margin-top:8px">Enviar diseño por email</button>
    </div>
  </aside>

  <script>
    // ------------------ Datos de ejemplo de productos ------------------
    const PRODUCTS = [
      { id: 1, title: 'Camiseta básica blanca', price: 35, img: 'https://images.unsplash.com/photo-1520975680038-3b7df2f212f9?auto=format&fit=crop&w=800&q=60' },
      { id: 2, title: 'Sudadera con capucha', price: 60, img: 'https://images.unsplash.com/photo-1593623917682-f5b7ab7f5d9b?auto=format&fit=crop&w=800&q=60' },
      { id: 3, title: 'Tote bag algodón', price: 18, img: 'https://images.unsplash.com/photo-1600180758890-2afc6f8e7a25?auto=format&fit=crop&w=800&q=60' }
    ];

    // ------------------ Render productos ------------------
    const productsEl = document.getElementById('products');
    const cart = [];
    function renderProducts(){
      productsEl.innerHTML = '';
      PRODUCTS.forEach(p=>{
        const el = document.createElement('div'); el.className='card';
        el.innerHTML = `
          <img src="${p.img}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn" onclick="addToCart(${p.id})">Agregar</button>
          </div>
        `;
        productsEl.appendChild(el);
      });
    }

    function addToCart(id){
      const prod = PRODUCTS.find(x=>x.id==id);
      cart.push({...prod, qty:1});
      updateCartUI();
    }

    function updateCartUI(){
      const list = document.getElementById('cartList');
      const count = document.getElementById('cartCount');
      list.innerHTML = '';
      let total = 0;
      cart.forEach((i, idx)=>{
        total += i.price;
        const row = document.createElement('div'); row.className='card';
        row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center';
        row.innerHTML = `<div>${i.title} <small>($${i.price.toFixed(2)})</small></div><div><button onclick=removeFromCart(${idx}) style='background:#ffedd5;border-radius:8px;padding:6px;border:0'>Quitar</button></div>`;
        list.appendChild(row);
      });
      count.textContent = cart.length;
      document.getElementById('cartTotal').textContent = cart.length ? 'Total: $' + total.toFixed(2) : 'Carrito vacío';
    }

    function removeFromCart(idx){ cart.splice(idx,1); updateCartUI(); }

    document.getElementById('cartBtn').addEventListener('click', ()=>{
      window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});
    })

    document.getElementById('checkoutBtn').addEventListener('click', ()=>{
      // abrir sidebar para personalizar estampados
      openSidebar();
    })

    // ------------------ IA Sidebar behaviour ------------------
    const sidebar = document.getElementById('aiSidebar');
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');

    function openSidebar(){ sidebar.classList.add('open'); sidebar.setAttribute('aria-hidden','false'); }
    function closeSidebar(){ sidebar.classList.remove('open'); sidebar.setAttribute('aria-hidden','true'); }

    document.getElementById('openAIChat').addEventListener('click', openSidebar);
    document.getElementById('closeAI').addEventListener('click', closeSidebar);

    function pushMessage(text, from='bot'){
      const m = document.createElement('div'); m.className='message ' + (from==='user' ? 'user':'bot');
      m.textContent = text; chatBox.appendChild(m); chatBox.scrollTop = chatBox.scrollHeight;
    }

    document.getElementById('sendMsg').addEventListener('click', ()=>{
      const v = userInput.value.trim(); if(!v) return; pushMessage(v,'user'); userInput.value='';
      // Simulación de respuesta del bot
      setTimeout(()=>{ pushMessage('Entendido. ¿Quieres que genere una vista previa del estampado con estas indicaciones? Haz click en "Generar imagen".'); }, 600);
    });

    // ------------------ Generación de imagen (frontend) ------------------
    document.getElementById('generateImage').addEventListener('click', async ()=>{
      const prompt = chatBox.querySelector('.user:last-child') ? chatBox.querySelector('.user:last-child').textContent : document.getElementById('userInput').value;
      if(!prompt){ alert('Describe el diseño primero.'); return; }
      pushMessage('Generando imagen… (esto puede tardar unos segundos)', 'bot');

      // Llamada al endpoint serverless /api/generate-image
      try{
        const res = await fetch('/api/generate-image', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ prompt, size: '1024x1024' })
        });
        if(!res.ok) throw new Error('Error en el servidor');
        const data = await res.json();
        // data.imageBase64 expected
        const img = new Image(); img.className='preview'; img.src = 'data:image/png;base64,' + data.imageBase64;
        const area = document.getElementById('imageResultArea'); area.innerHTML=''; area.appendChild(img);
        pushMessage('Imagen generada. Puedes enviarla por email usando el botón "Enviar diseño por email".', 'bot');
      }catch(err){
        console.error(err); alert('No se pudo generar la imagen. Revisa la consola.');
      }
    });

    // ------------------ Enviar por email ------------------
    document.getElementById('sendToEmail').addEventListener('click', async ()=>{
      const email = document.getElementById('customerEmail').value.trim();
      if(!email){ alert('Ingresa tu correo.'); return; }
      const imgEl = document.querySelector('#imageResultArea img');
      if(!imgEl){ alert('No hay imagen generada aún.'); return; }

      // Extraer base64
      const base64 = imgEl.src.split(',')[1];
      // Enviar al servidor para remitir por correo
      try{
        const body = {
          toEmail: email,
          subject: 'Tu diseño personalizado',
          htmlBody: '<p>Adjuntamos tu diseño personalizado.</p>',
          attachmentBase64: base64,
          filename: 'estampado.png'
        };
        const res = await fetch('/api/send-email', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
        if(!res.ok) throw new Error('Error al enviar email');
        alert('Diseño enviado. Revisa tu correo.');
      }catch(err){ console.error(err); alert('Error al enviar el email.'); }
    });

    // Inicialización
    renderProducts(); updateCartUI();
  </script>


  <!--
  ------------------ Ejemplo de servidor (Node.js + Express) ------------------
  Guarda este código en un archivo server.js y despliega en Heroku / Render / Vercel (serverless) / Netlify functions.
  RECUERDA: nunca pongas la API key en el frontend. Usa variables de entorno.

  // server.js (Node/Express) - ejemplo

  const express = require('express');
  const fetch = require('node-fetch'); // o global fetch en entornos modernos
  const nodemailer = require('nodemailer');
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // /api/generate-image -> solicitar a la API de imágenes (OpenAI u otra)
  app.post('/api/generate-image', async (req, res) => {
    try{
      const { prompt, size } = req.body;
      // Ejemplo con OpenAI Images API (ajusta según la doc vigente):
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST', headers: {
          'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({ prompt, n:1, size: size || '1024x1024' })
      });
      const json = await response.json();
      // Dependiendo del proveedor, puede devolver URL o base64. Aquí asumimos base64.
      // Si devuelve URL, debes descargar la imagen y codificarla a base64.
      const imageBase64 = json.data[0].b64_json || null;
      if(!imageBase64){
        // Si la API devolvió una URL:
        const imageUrl = json.data[0].url;
        const imgRes = await fetch(imageUrl);
        const arrayBuffer = await imgRes.arrayBuffer();
        const b64 = Buffer.from(arrayBuffer).toString('base64');
        return res.json({ imageBase64: b64 });
      }
      res.json({ imageBase64 });
    }catch(err){ console.error(err); res.status(500).json({error:err.message}); }
  });

  // /api/send-email -> usar nodemailer para enviar el correo con adjunto
  app.post('/api/send-email', async (req, res) => {
    try{
      const { toEmail, subject, htmlBody, attachmentBase64, filename } = req.body;
      // Configura transporter con tu SMTP (ej: Gmail SMTP, Mailgun, SendGrid SMTP)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: toEmail,
        subject: subject || 'Diseño personalizado',
        html: htmlBody || '<p>Adjunto tu diseño</p>',
        attachments: [{ filename: filename || 'estampado.png', content: attachmentBase64, encoding: 'base64' }]
      };

      const info = await transporter.sendMail(mailOptions);
      res.json({ ok:true, info });
    }catch(err){ console.error(err); res.status(500).json({error:err.message}); }
  });

  const PORT = process.env.PORT || 3000; app.listen(PORT, ()=>console.log('Server listening', PORT));

  -----------------------------------------------------------------------------
  -->

</body>
</html>
