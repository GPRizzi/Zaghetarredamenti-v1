# Zaghet Arredamenti - Analisi Progetto Nuovo Sito

## 1. STATO ATTUALE - DIAGNOSI

### Problemi Critici Riscontrati
Il sito WordPress attuale (tema Avada) e' **gravemente compromesso**:

1. **Redirect malevoli** - La pagina /about-us/ reindirizza a domini esterni sospetti (psplegal.it/wp-admin/network/Rez_LEDGER/)
2. **SEO Spam Injection** - Google indicizza il dominio come "NordicStride™ - Ortopediske herresko for menn" (scarpe ortopediche norvegesi) al posto del contenuto reale
3. **Pagine distrutte** - Diverse pagine restituiscono 404 (/zaghet-articoli/, /zaghet-outlet-orsago/)
4. **Reputazione dominio danneggiata** - Il dominio e' probabilmente in blacklist su browser e motori di ricerca

### Causa Probabile
WordPress non aggiornato + tema Avada non patchato + hosting condiviso su Register.it con sicurezza minima = target facile per attacchi automatizzati.

---

## 2. SITUAZIONE DOMINIO E EMAIL

### Dominio: zaghetarredamenti.it
- Registrato su Register.it
- Il dominio va MANTENUTO (richiesta del cliente)
- Sara' necessario puntare i DNS al nuovo hosting dopo la migrazione

### Email Aziendali
- Ospitate su Register.it con il dominio
- Contengono dati sensibili importanti
- **ATTENZIONE:** La migrazione del sito NON deve interrompere il servizio email
- Opzioni:
  1. Mantenere le email su Register.it e spostare solo il sito
  2. Migrare tutto (email + sito) su una piattaforma piu' sicura (es. Google Workspace)

---

## 3. ANALISI PIATTAFORMA: SHOPIFY vs ALTERNATIVE

### SHOPIFY - Valutazione

**PRO:**
- Sicurezza gestita da Shopify (SSL, PCI compliance, aggiornamenti automatici)
- Zero manutenzione server
- Integrazione nativa print-on-demand (Printful, Printify, Gooten)
- Temi professionali per arredamento
- Gestione inventario e pagamenti integrata
- App store ricchissimo
- Uptime 99.99%

**CONTRO:**
- Costo mensile (Basic: ~36 EUR/mese, Shopify: ~105 EUR/mese)
- Commissioni su transazioni (se non usi Shopify Payments)
- Meno flessibilita' nel design rispetto a soluzioni custom
- Il dominio resta registrato altrove (Register.it) - serve solo il puntamento DNS
- NON gestisce le email - servira' un servizio separato (Google Workspace o simile)

### ALTERNATIVE CONSIDERATE

#### Soluzione Custom (Next.js/React + Headless CMS)
- **Pro:** Massima flessibilita', performance, SEO totale
- **Contro:** Costi di sviluppo piu' alti, manutenzione continua necessaria, no e-commerce nativo

#### WooCommerce (WordPress)
- **SCONSIGLIATO** - Stesso ecosistema che ha causato i problemi attuali

#### Squarespace
- **Pro:** Design eccellente, sicurezza gestita
- **Contro:** E-commerce limitato, no print-on-demand nativo, meno flessibile di Shopify

### RACCOMANDAZIONE: SHOPIFY

Shopify e' la scelta giusta per questo progetto perche':
1. **Risolve il problema sicurezza** - Mai piu' WordPress hackerato
2. **Print-on-demand pronto** - Merchandising attivabile subito
3. **Il cliente puo' gestirlo** - Backend intuitivo, non serve un tecnico
4. **Scalabile** - Da vetrina a e-commerce completo senza rifare nulla
5. **Costo prevedibile** - Nessuna sorpresa, niente hosting da gestire

### Piano di Azione per Dominio + Email
1. **Dominio** resta su Register.it, si cambiano solo i DNS per puntare a Shopify
2. **Email** -> Migrare a Google Workspace (6 EUR/utente/mese) per sicurezza e affidabilita'
   - Oppure mantenere su Register.it se funzionano bene (verificare con il cliente)

---

## 4. STRUTTURA NUOVO SITO PROPOSTA

### Pagine Principali

1. **HOME** - Hero emozionale + servizi + portfolio highlights + testimonial + CTA
2. **CHI SIAMO** - Storia di Lino Zaghet, filosofia, valori, team
3. **SERVIZI** - Costruisci / Ristruttura / Progetta / Realizza (4 sezioni dettagliate)
4. **REALIZZAZIONI** - Portfolio filtrato per categoria (Residenziale / Commerciale / Su Misura)
5. **LE NOSTRE SEDI** - Sede Storica + Atelier + Outlet con mappa interattiva
6. **SHOP / MERCHANDISING** - Sezione print-on-demand (magliette, accessori, gadget branded)
7. **CONTATTI / PREVENTIVO** - Form avanzato + mappa + orari + social

### Sezioni Aggiuntive (per impressionare)
- **Blog / Ispirazioni** - Articoli su tendenze arredamento, consigli, prima/dopo
- **Configuratore Cucina** - Tool interattivo per scegliere stili/materiali (futuro)
- **Virtual Tour** - Tour 360 dello showroom/atelier
- **Recensioni** - Sezione dedicata con integrazione Google Reviews
- **FAQ** - Domande frequenti su processo, tempistiche, garanzie

### Design Direction
- **Stile:** Elegante, minimale, caldo - deve trasmettere artigianalita' e qualita'
- **Palette:** Toni caldi del legno + bianco + accent color sofisticato
- **Font:** Serif per titoli (eleganza), sans-serif per body (leggibilita')
- **Foto:** Full-width, alta qualita', focus sui dettagli artigianali
- **Mobile-first:** Il 70%+ del traffico arriva da mobile
