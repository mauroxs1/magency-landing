/* Textos de la landing. El español vive en el HTML (para Google); acá están EN y PT,
   y los textos de la encuesta y de WhatsApp en los tres idiomas. */
window.CONFIG = {
  whatsapp: "5492612180849",
  // Pesos por dólar para mostrar precios en USD. Revisar una vez por mes.
  arsPorUsd: 1450,
  // Recargo para clientes del exterior (versiones EN y PT).
  recargoExterior: 0.25
};

window.I18N = {
  en: {
    "nav.plans": "Plans", "nav.services": "Services", "nav.clients": "Clients", "nav.about": "About", "nav.cta": "Let's talk",
    "hero.eyebrow": "Digital growth agency",
    "hero.title": "Your business, <em>organized</em> inside and <em>growing</em> outside.",
    "hero.lead": "Social media, ads, landing pages and management systems in one place. Affordable plans and a real person who answers you.",
    "hero.skip": "I'd rather see the whole site", "hero.cta1": "Find your plan", "hero.cta2": "See plans and prices",
    "hero.t1": "Everything in one place", "hero.t2": "Plans from {min}", "hero.t3": "Clients in Argentina and Portugal",
    "quiz.title": "Find your plan in 3 questions",
    "paths.eyebrow": "Where to start", "paths.title": "Where is your business right now?",
    "paths.p1": "I'm just starting", "paths.p1d": "We set up your social media, logo and ad account so you start right from day one.",
    "paths.p2": "I already sell and want more", "paths.p2d": "Steady content and campaigns so more customers message you.",
    "paths.p3": "I want to scale", "paths.p3d": "Automation and AI to answer fast, sell more and save hours.",
    "paths.p4": "I want to organize my numbers", "paths.p4d": "A simple system to know how much you sell, spend and earn.",
    "plans.swipe": "Swipe to see the plans →", "fab": "Talk to Mauro", "plans.eyebrow": "Plans", "plans.title": "Choose your <em>plan</em>",
    "plans.lead": "Clear prices, no fine print. We adjust the final price to your business.",
    "p.once": "one-time payment", "p.month": "per month", "p.from": "from", "p.badge": "Most popular", "p.cta": "I want this plan",
    "p.inicio.for": "To launch your social media properly from day one.",
    "p.inicio.1": "Instagram and Facebook set up and linked in Meta", "p.inicio.2": "Ad account created and configured", "p.inicio.3": "3 designed posts", "p.inicio.4": "Logo designed with AI and finished by hand",
    "p.esencial.for": "For small businesses that need a steady presence.",
    "p.esencial.1": "Business analysis and strategy", "p.esencial.2": "Social media management and monthly calendar", "p.esencial.3": "Post and story design", "p.esencial.4": "Monthly report",
    "p.profesional.for": "For businesses that already sell and want more leads.",
    "p.profesional.1": "Everything in M Esencial", "p.profesional.2": "More content every month", "p.profesional.3": "Meta campaigns to get leads", "p.profesional.4": "Advanced metrics and reports",
    "p.premium.for": "For businesses that want to scale and automate.",
    "p.premium.1": "Everything in M Profesional", "p.premium.2": "AI automation", "p.premium.3": "AI tools for your business", "p.premium.4": "Faster replies and less manual work",
    "plans.help": "Not sure which one? We'll tell you in 2 minutes.", "plans.helpcta": "Message Mauro",
    "plans.note": "Ad spend paid to Meta is not included in the plans. International prices include service adaptation, support and management for clients outside Argentina.",
    "svc.eyebrow": "More services", "svc.title": "We organize your business <em>inside</em>", "svc.lead": "Hire them on their own or with any plan.",
    "svc.g.d": "Know how much you sell, spend and earn, without spreadsheets or notebooks.",
    "svc.g.1": "Sales tracking", "svc.g.2": "Financial control", "svc.g.3": "Monthly report", "svc.g.4": "Business advice", "svc.cta": "I want to organize my numbers",
    "svc.l.d": "A page that shows your brand and brings you ready-to-buy leads, every month.",
    "svc.l.1": "Custom design", "svc.l.2": "Hosting included", "svc.l.3": "1 change per month", "svc.l.4": "No minimum term", "svc.cta2": "I want my landing page",
    "how.eyebrow": "How we work", "how.title": "From the first chat to results",
    "how.1": "We talk", "how.1d": "You tell us about your business and we see what you really need.",
    "how.2": "We build the plan", "how.2d": "A tailored strategy with clear goals and a fixed price.",
    "how.3": "We get to work", "how.3d": "We create, publish and manage consistently.",
    "how.4": "We measure and improve", "how.4d": "We show you the results and adjust what's needed.",
    "cl.eyebrow": "Clients", "cl.title": "Businesses already working with us", "cl.lead": "Visit their social media and see the work live.",
    "cl.both": "Management system + social media", "cl.social": "Social media", "cl.sys": "Management system", "cl.ig": "See Instagram", "cl.gyn": "Gynecologist", "cl.barber": "Barbershop", "cl.mayra": "Mayra, psychologist",
    "vo.eyebrow": "Testimonials", "vo.title": "Hear it from <em>them</em>", "vo.lead": "Real voice notes our clients sent us on WhatsApp (in Spanish).",
    "vo.fabiana": "I've been working with Magency for a year and I've had a substantial increase in patients. The whole team gives me a lot of support and advice. I've already recommended them to several people and they made me look great.",
    "vo.magnus": "Before Magency, the brand had personality but lacked consistency. Today it has that consistency and its personality got better. In one phrase: effectiveness and professionalism.",
    "me.role": "Founder and creative director", "me.eyebrow": "Who's behind it",
    "me.title": "You talk <em>face to face</em> with the person doing the work",
    "me.1": "Everything in one place", "me.1d": "Social media, ads, web and management, without four different providers.",
    "me.2": "We always answer", "me.2d": "We keep an eye on your business and solve your questions.",
    "me.3": "Applied AI", "me.3d": "We use new tools to do more, better and at an affordable cost.",
    "me.cta": "Talk to Mauro",
    "final.title": "Shall we start?", "final.lead": "Message us and let's talk. No commitment.", "final.cta": "Message on WhatsApp"
  },
  pt: {
    "nav.plans": "Planos", "nav.services": "Serviços", "nav.clients": "Clientes", "nav.about": "Sobre nós", "nav.cta": "Vamos conversar",
    "hero.eyebrow": "Agência de crescimento digital",
    "hero.title": "O seu negócio, <em>organizado</em> por dentro e <em>crescendo</em> por fora.",
    "hero.lead": "Redes sociais, anúncios, landing pages e sistemas de gestão num só lugar. Planos acessíveis e alguém que responde de verdade.",
    "hero.skip": "Prefiro ver o site completo", "hero.cta1": "Encontre o seu plano", "hero.cta2": "Ver planos e preços",
    "hero.t1": "Tudo num só lugar", "hero.t2": "Planos a partir de {min}", "hero.t3": "Clientes na Argentina e em Portugal",
    "quiz.title": "Encontre o seu plano em 3 perguntas",
    "paths.eyebrow": "Por onde começar", "paths.title": "Em que momento está o seu negócio?",
    "paths.p1": "Estou a começar", "paths.p1d": "Montamos as suas redes, o logótipo e a conta de anúncios para começar bem desde o primeiro dia.",
    "paths.p2": "Já vendo e quero mais", "paths.p2d": "Conteúdo constante e campanhas para que mais clientes lhe escrevam.",
    "paths.p3": "Quero escalar", "paths.p3d": "Automação e IA para responder rápido, vender mais e poupar horas.",
    "paths.p4": "Quero organizar os meus números", "paths.p4d": "Um sistema simples para saber quanto vende, gasta e ganha.",
    "plans.swipe": "Deslize para ver os planos →", "fab": "Falar com o Mauro", "plans.eyebrow": "Planos", "plans.title": "Escolha o seu <em>plano</em>",
    "plans.lead": "Preços claros, sem letras pequenas. Ajustamos o valor final ao seu negócio.",
    "p.once": "pagamento único", "p.month": "por mês", "p.from": "a partir de", "p.badge": "Mais escolhido", "p.cta": "Quero este plano",
    "p.inicio.for": "Para começar nas redes bem preparado desde o primeiro dia.",
    "p.inicio.1": "Instagram e Facebook criados e ligados no Meta", "p.inicio.2": "Conta de anúncios criada e configurada", "p.inicio.3": "3 publicações desenhadas", "p.inicio.4": "Logótipo criado com IA e finalizado à mão",
    "p.esencial.for": "Para pequenos negócios que precisam de presença constante.",
    "p.esencial.1": "Análise do negócio e estratégia", "p.esencial.2": "Gestão de redes e calendário mensal", "p.esencial.3": "Design de publicações e stories", "p.esencial.4": "Relatório mensal",
    "p.profesional.for": "Para negócios que já vendem e querem mais contactos.",
    "p.profesional.1": "Tudo do M Esencial", "p.profesional.2": "Mais conteúdo por mês", "p.profesional.3": "Campanhas no Meta para gerar contactos", "p.profesional.4": "Métricas e relatórios avançados",
    "p.premium.for": "Para negócios que querem escalar e automatizar.",
    "p.premium.1": "Tudo do M Profesional", "p.premium.2": "Automação com IA", "p.premium.3": "Ferramentas de IA para o seu negócio", "p.premium.4": "Respostas rápidas e menos trabalho manual",
    "plans.help": "Não sabe qual escolher? Dizemos-lhe em 2 minutos.", "plans.helpcta": "Falar com o Mauro",
    "plans.note": "O investimento em anúncios pago ao Meta não está incluído nos planos. Os valores internacionais incluem adaptação do serviço, suporte e gestão para clientes fora da Argentina.",
    "svc.eyebrow": "Mais serviços", "svc.title": "Organizamos o seu negócio <em>por dentro</em>", "svc.lead": "Contrate-os sozinhos ou com qualquer plano.",
    "svc.g.d": "Saiba quanto vende, gasta e ganha, sem folhas de cálculo nem cadernos.",
    "svc.g.1": "Controlo de vendas", "svc.g.2": "Controlo financeiro", "svc.g.3": "Relatório mensal", "svc.g.4": "Aconselhamento sobre o negócio", "svc.cta": "Quero organizar os meus números",
    "svc.l.d": "Uma página que mostra a sua marca e lhe traz contactos prontos a comprar, todos os meses.",
    "svc.l.1": "Design à medida", "svc.l.2": "Alojamento incluído", "svc.l.3": "1 alteração por mês", "svc.l.4": "Sem fidelização", "svc.cta2": "Quero a minha landing",
    "how.eyebrow": "Como trabalhamos", "how.title": "Da primeira conversa aos resultados",
    "how.1": "Conversamos", "how.1d": "Conta-nos sobre o seu negócio e vemos o que precisa de verdade.",
    "how.2": "Montamos o plano", "how.2d": "Uma estratégia à medida, com objetivos claros e preço fechado.",
    "how.3": "Mãos à obra", "how.3d": "Produzimos, publicamos e gerimos com constância.",
    "how.4": "Medimos e melhoramos", "how.4d": "Mostramos os resultados e ajustamos o que for preciso.",
    "cl.eyebrow": "Clientes", "cl.title": "Negócios que já trabalham connosco", "cl.lead": "Visite as redes deles e veja o trabalho a funcionar.",
    "cl.both": "Sistema de gestão + redes", "cl.social": "Redes sociais", "cl.sys": "Sistema de gestão", "cl.ig": "Ver Instagram", "cl.gyn": "Ginecologista", "cl.barber": "Barbearia", "cl.mayra": "Mayra, psicóloga",
    "vo.eyebrow": "Testemunhos", "vo.title": "Ouça <em>quem</em> já trabalha connosco", "vo.lead": "Áudios reais que os nossos clientes nos enviaram no WhatsApp (em espanhol).",
    "vo.fabiana": "Trabalho com a Magency há um ano e tive um aumento substancial de pacientes. Tenho muito acompanhamento e aconselhamento de toda a equipa. Já os recomendei a várias pessoas e fizeram-me ficar muito bem.",
    "vo.magnus": "Antes da Magency, a marca tinha personalidade mas faltava-lhe constância. Hoje tem essa constância e a personalidade melhorou. Numa frase: eficácia e profissionalismo.",
    "me.role": "Fundador e diretor criativo", "me.eyebrow": "Quem está por trás",
    "me.title": "Fala <em>cara a cara</em> com quem faz o trabalho",
    "me.1": "Tudo num só lugar", "me.1d": "Redes, anúncios, web e gestão, sem quatro fornecedores diferentes.",
    "me.2": "Respondemos sempre", "me.2d": "Acompanhamos o seu negócio e resolvemos as suas dúvidas.",
    "me.3": "IA aplicada", "me.3d": "Usamos ferramentas novas para fazer mais, melhor e a um custo acessível.",
    "me.cta": "Falar com o Mauro",
    "final.title": "Vamos começar?", "final.lead": "Escreva-nos e conversamos. Sem compromisso.", "final.cta": "Escrever no WhatsApp"
  }
};

/* Encuesta y mensajes de WhatsApp en los tres idiomas */
window.QUIZ = {
  es: {
    count: "Pregunta {n} de 3", back: "← Volver", restart: "Empezar de nuevo",
    q: [
      { t: "¿En qué etapa está tu negocio?", o: { arranco: "Recién arranco", vendo: "Ya vendo, pero quiero más", escalar: "Quiero escalar" } },
      { t: "¿Qué es lo que más te cuesta hoy?", o: { presencia: "No tengo presencia en redes", clientes: "Tengo redes, pero no me traen clientes", tiempo: "No tengo tiempo para responder y publicar", numeros: "No sé bien cuánto gano o vendo" } },
      { t: "¿Tenés presupuesto para publicidad?", o: { no: "Todavía no", algo: "Sí, algo", fuerte: "Sí, quiero invertir fuerte" } }
    ],
    resultTitle: "Tu plan ideal", seeAll: "Ver todos los planes ↓", plus: "+ {x}", cta: "Quiero este plan",
    why: {
      inicio: "Para arrancar bien: redes armadas, logo y cuenta publicitaria, en un pago único.",
      esencial: "Presencia constante en redes, sin que tengas que ocuparte vos.",
      profesional: "Contenido y campañas para que te escriban más clientes.",
      premium: "Automatizaciones e IA para escalar y ahorrar horas.",
      landing: "Sumale una landing para recibir consultas todos los meses.",
      gestion: "Y un sistema para saber cuánto vendés y ganás."
    },
    msgQuiz: "¡Hola Mauro! Hice el test en la web.\n• Etapa: {a1}\n• Lo que más me cuesta: {a2}\n• Presupuesto para publicidad: {a3}\nMe recomendó {plan}. ¿Charlamos?",
    msgPlan: "¡Hola Mauro! Vi la web y me interesa {plan}. ¿Me contás más?",
    msgHelp: "¡Hola Mauro! Vi la web y no sé qué plan me conviene. ¿Me ayudás a elegir?",
    msgGeneral: "¡Hola Mauro! Vi la web de Magency y quiero saber más."
  },
  en: {
    count: "Question {n} of 3", back: "← Back", restart: "Start over",
    q: [
      { t: "What stage is your business at?", o: { arranco: "I'm just starting", vendo: "I already sell but want more", escalar: "I want to scale" } },
      { t: "What's hardest for you today?", o: { presencia: "I'm not on social media", clientes: "I have social media, but it doesn't bring customers", tiempo: "I don't have time to reply and post", numeros: "I don't really know how much I earn or sell" } },
      { t: "Do you have an ad budget?", o: { no: "Not yet", algo: "Yes, some", fuerte: "Yes, I want to invest big" } }
    ],
    resultTitle: "Your ideal plan", seeAll: "See all plans ↓", plus: "+ {x}", cta: "I want this plan",
    why: {
      inicio: "To start right: social media set up, logo and ad account, in a one-time payment.",
      esencial: "A steady presence on social media without you having to handle it.",
      profesional: "Content and campaigns so more customers message you.",
      premium: "Automation and AI to scale and save hours.",
      landing: "Add a landing page to get leads every month.",
      gestion: "And a system to know how much you sell and earn."
    },
    msgQuiz: "Hi Mauro! I took the test on the website.\n• Stage: {a1}\n• Hardest part: {a2}\n• Ad budget: {a3}\nIt recommended {plan}. Can we talk?",
    msgPlan: "Hi Mauro! I saw the website and I'm interested in {plan}. Can you tell me more?",
    msgHelp: "Hi Mauro! I saw the website and I'm not sure which plan suits me. Can you help me choose?",
    msgGeneral: "Hi Mauro! I saw the Magency website and I'd like to know more."
  },
  pt: {
    count: "Pergunta {n} de 3", back: "← Voltar", restart: "Recomeçar",
    q: [
      { t: "Em que fase está o seu negócio?", o: { arranco: "Estou a começar", vendo: "Já vendo, mas quero mais", escalar: "Quero escalar" } },
      { t: "O que lhe custa mais hoje?", o: { presencia: "Não tenho presença nas redes", clientes: "Tenho redes, mas não me trazem clientes", tiempo: "Não tenho tempo para responder e publicar", numeros: "Não sei bem quanto ganho ou vendo" } },
      { t: "Tem orçamento para anúncios?", o: { no: "Ainda não", algo: "Sim, algum", fuerte: "Sim, quero investir forte" } }
    ],
    resultTitle: "O seu plano ideal", seeAll: "Ver todos os planos ↓", plus: "+ {x}", cta: "Quero este plano",
    why: {
      inicio: "Para começar bem: redes montadas, logótipo e conta de anúncios, num pagamento único.",
      esencial: "Presença constante nas redes, sem ter de se ocupar disso.",
      profesional: "Conteúdo e campanhas para que mais clientes lhe escrevam.",
      premium: "Automação e IA para escalar e poupar horas.",
      landing: "Junte uma landing para receber contactos todos os meses.",
      gestion: "E um sistema para saber quanto vende e ganha."
    },
    msgQuiz: "Olá Mauro! Fiz o teste no site.\n• Fase: {a1}\n• O que me custa mais: {a2}\n• Orçamento para anúncios: {a3}\nRecomendou-me {plan}. Podemos conversar?",
    msgPlan: "Olá Mauro! Vi o site e tenho interesse no {plan}. Pode contar-me mais?",
    msgHelp: "Olá Mauro! Vi o site e não sei que plano me convém. Ajuda-me a escolher?",
    msgGeneral: "Olá Mauro! Vi o site da Magency e quero saber mais."
  }
};
