(() => {
"use strict";
const script = document.currentScript;
const API = (script?.dataset.apiUrl || "https://YOUR-RENDER-SERVICE.onrender.com").replace(/\/+$/, "");
const css = new URL("./chatbot-widget.css", script?.src || location.href).href;
if (document.getElementById("ks-chatbot-root")) return;
const link = document.createElement("link"); link.rel = "stylesheet"; link.href = css; document.head.appendChild(link);
const root = document.createElement("div"); root.id = "ks-chatbot-root";
root.innerHTML = `
<button class="ks-chat-launcher" type="button" aria-label="Open assistant"><span class="ks-launcher-icon">✦</span><span>Ask us</span></button>
<section class="ks-chat-panel" aria-label="Kingdom Spirit AI assistant" hidden>
<header class="ks-chat-header"><div class="ks-chat-brand"><div class="ks-chat-avatar">KS</div><div><strong>Kingdom Spirit Assistant</strong><small>Here to help you move forward</small></div></div><button class="ks-chat-close" type="button" aria-label="Close">×</button></header>
<div class="ks-chat-messages" aria-live="polite"><div class="ks-message ks-bot-message">Hello! Welcome to Kingdom Spirit Technology. I'm your virtual assistant. What would you like to know about our services or how we can help your business?</div></div>
<div class="ks-chat-suggestions"><button type="button" data-question="What services do you offer?">Our services</button><button type="button" data-question="How can I book a consultation?">Book a consultation</button><button type="button" data-question="Tell me about your AI solutions.">AI solutions</button></div>
<form class="ks-chat-form"><label class="ks-visually-hidden" for="ks-chat-input">Your message</label><textarea id="ks-chat-input" rows="1" maxlength="1500" placeholder="Type your question..." required></textarea><button class="ks-chat-send" type="submit" aria-label="Send">➤</button></form>
<div class="ks-chat-footnote">AI-generated responses may need confirmation for quotes and project details.</div></section>`;
document.body.appendChild(root);
const launcher=root.querySelector(".ks-chat-launcher"), panel=root.querySelector(".ks-chat-panel"), input=root.querySelector("#ks-chat-input"), messages=root.querySelector(".ks-chat-messages"), send=root.querySelector(".ks-chat-send"), history=[];
launcher.addEventListener("click",()=>{panel.hidden=!panel.hidden;if(!panel.hidden)input.focus();});
root.querySelector(".ks-chat-close").addEventListener("click",()=>{panel.hidden=true;launcher.focus();});
function add(text,role){const el=document.createElement("div");el.className="ks-message "+(role==="user"?"ks-user-message":"ks-bot-message");el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
async function ask(value){const text=value.trim();if(!text)return;add(text,"user");history.push({role:"user",content:text});input.value="";input.style.height="auto";send.disabled=true;const pending=add("Thinking…","assistant");
try{const response=await fetch(API+"/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history.slice(-10)})});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||"The assistant could not respond right now.");const reply=String(data.reply||"Please try asking again.");pending.textContent=reply;history.push({role:"assistant",content:reply});}
catch(error){pending.textContent=error.message==="Failed to fetch"?"I can't connect to the assistant right now. Please try again shortly or use the website Contact page.":error.message;}
finally{send.disabled=false;input.focus();messages.scrollTop=messages.scrollHeight;}}
root.querySelector(".ks-chat-form").addEventListener("submit",e=>{e.preventDefault();ask(input.value);});
input.addEventListener("input",()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,110)+"px";});
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();root.querySelector(".ks-chat-form").requestSubmit();}});
root.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>ask(b.dataset.question)));
})();