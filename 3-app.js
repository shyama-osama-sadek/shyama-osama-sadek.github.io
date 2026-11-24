(function(){
var LANGS=["en","ar"];
var state={site:null,proj:null,lang:"en"};
function saved(){try{var l=localStorage.getItem("lang");if(LANGS.indexOf(l)>-1)return l}catch(e){}return null}
function save(l){try{localStorage.setItem("lang",l)}catch(e){}}
function t(o,l){return o&&typeof o==="object"&&!Array.isArray(o)&&(l in o)?o[l]:o}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function sec(id,cls){var s=el("section",cls||"");s.id=id;var d=el("div","in");s.appendChild(d);return[s,d]}
function render(){
 var S=state.site,U=S.ui,l=state.lang,m=document.getElementById("main");
 document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";
 document.title=t(U.title,l);
 document.getElementById("brand").textContent=S.name;
 var nav=document.getElementById("nav");nav.innerHTML="";
 Object.keys(U.nav).forEach(function(k){var a=el("a","",t(U.nav[k],l));a.href="#"+k;nav.appendChild(a)});
 var b=document.getElementById("lang");b.textContent=t(U.switch,l);b.lang=l==="en"?"ar":"en";
 m.innerHTML="";
 // hero
 var h=el("section","hero");h.id="home";var hi=el("div","in");h.appendChild(hi);
 hi.appendChild(el("h1","",S.name));hi.appendChild(el("div","role",t(U.role,l)));hi.appendChild(el("p","",t(U.tagline,l)));
 var a1=el("a","btn p",t(U.cta1,l));a1.href="#projects";var a2=el("a","btn s",t(U.cta2,l));a2.href="#contact";hi.appendChild(a1);hi.appendChild(a2);m.appendChild(h);
 // about
 var x=sec("about");x[1].appendChild(el("h2","",t(U.aboutH,l)));x[1].appendChild(el("p","",t(U.about,l)));
 var f=el("div","facts");U.facts.forEach(function(r){var d=el("div","fact");d.appendChild(el("b","",t(r.k,l)));d.appendChild(el("span","",t(r.v,l)));f.appendChild(d)});x[1].appendChild(f);m.appendChild(x[0]);
 // services
 x=sec("services","alt");x[1].appendChild(el("h2","",t(U.servicesH,l)));var g=el("div","grid g3");
 U.services.forEach(function(s){var c=el("div","card");c.appendChild(el("h3","",t(s.h,l)));var u=el("ul");s.items.forEach(function(i){u.appendChild(el("li","",t(i,l)))});c.appendChild(u);g.appendChild(c)});
 x[1].appendChild(g);m.appendChild(x[0]);
 // experience
 x=sec("experience");x[1].appendChild(el("h2","",t(U.experienceH,l)));
 U.jobs.forEach(function(j){var r=el("div","job"),L=el("div");L.appendChild(el("div","d",t(j.date,l)));L.appendChild(el("h3","",t(j.title,l)));L.appendChild(el("div","o",j.org));
  var u=el("ul");j.points.forEach(function(p){u.appendChild(el("li","",t(p,l)))});r.appendChild(L);r.appendChild(u);x[1].appendChild(r)});m.appendChild(x[0]);
 // ai
 x=sec("ai","alt");x[1].appendChild(el("h2","",t(U.aiH,l)));x[1].appendChild(el("p","",t(U.aiIntro,l)));g=el("div","grid g2");g.style.marginTop="20px";
 U.ai.forEach(function(s){var c=el("div","card");c.appendChild(el("h3","",t(s.h,l)));c.appendChild(el("p","",t(s.t,l)));g.appendChild(c)});x[1].appendChild(g);
 var th=el("h3","",t(U.toolsH,l));th.style.margin="40px 0 14px";x[1].appendChild(th);var ch=el("div","chips");U.tools.forEach(function(n){ch.appendChild(el("span","chip",n))});x[1].appendChild(ch);m.appendChild(x[0]);
 // projects
 x=sec("projects");x[1].appendChild(el("h2","",t(U.projectsH,l)));x[1].appendChild(el("p","",t(U.projectsIntro,l)));g=el("div","grid g2");g.style.marginTop="20px";
 state.proj.projects.forEach(function(p){
  var title=p["title_"+l]||p.title_en;if(!title)return;
  var c=el("article","card proj"),sh=el("div","shot");
  if(p.image){var im=el("img");im.src=p.image;im.alt=title;im.loading="lazy";sh.appendChild(im)}
  c.appendChild(sh);var pb=el("div","pb");pb.appendChild(el("h3","",title));
  var sm=p["summary_"+l]||p.summary_en;if(sm)pb.appendChild(el("p","",sm));
  [["role",U.labels.role],["tools",U.labels.tools],["result",U.labels.result]].forEach(function(k){var v=p[k[0]+"_"+l]||p[k[0]+"_en"];if(v){var d=el("div","meta");d.appendChild(el("b","",t(k[1],l)+": "));d.appendChild(document.createTextNode(v));pb.appendChild(d)}});
  if(p.link&&/^https?:\/\//.test(p.link)){var a=el("a","btn",t(U.labels.link,l));a.href=p.link;a.target="_blank";a.rel="noopener";pb.appendChild(a)}
  c.appendChild(pb);g.appendChild(c)});
 x[1].appendChild(g);m.appendChild(x[0]);
 // contact
 x=sec("contact","contact");x[1].appendChild(el("h2","",t(U.contactH,l)));x[1].appendChild(el("p","",t(U.contact,l)));
 var mail=el("a","btn p",t(U.emailLabel,l)+": "+S.email);mail.href="mailto:"+S.email;x[1].appendChild(mail);m.appendChild(x[0]);
 var ft=el("footer","","© "+new Date().getFullYear()+" "+S.name);m.appendChild(ft);
}
document.getElementById("lang").addEventListener("click",function(){state.lang=state.lang==="en"?"ar":"en";save(state.lang);render();window.scrollTo(0,0)});
Promise.all([fetch("data/site.json").then(function(r){return r.json()}),fetch("data/projects.json").then(function(r){return r.json()})]).then(function(d){
 state.site=d[0];state.proj=d[1];
 var q=(location.search.match(/lang=(en|ar)/)||[])[1];state.lang=q||saved()||"en";render()
}).catch(function(){document.getElementById("main").textContent="Could not load content."});
})();
