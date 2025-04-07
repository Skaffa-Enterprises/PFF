function MoveBiker() {
    const Image = document.getElementById("biker");
    Image.style.left = '0%';

    function ToRight() {
        Image.style.left = '95%';
        Image.style.transition = 'all 28s';
    }
    function Flip() {
        Image.style.transform = 'rotateY(180deg)';
        Image.style.transition = 'all 2s';
    }
    function ToLeft() {
        Image.style.left = '0%';
        Image.style.transition = 'all 28s';
    }
    function UnFlip() {
        Image.style.transform = 'rotateY(0deg)';
        Image.style.transition = 'all 2s';
    }

    ToRight();
    setTimeout(() => {
        Flip();
        setTimeout(() => {
            ToLeft();
            setTimeout(() => {
                UnFlip();
            }, 28000);
        }, 2000);
    }, 28000);
}

MoveBiker();
setInterval(MoveBiker, 60000);

document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slideshow img");
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    }

    showSlide(slideIndex);
    setInterval(nextSlide, 5000);

    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    welcomeMSG();
});

function welcomeMSG() {
    if (!window.location.pathname.endsWith("index.html")) return
    fetch('/Documents/welcomeMessage.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("welcomeMessage").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("welcomeMessage").innerHTML = "Welkom bij de Fluitende Fietser!";
        });
}

/* Dax Java Code */
document.addEventListener("DOMContentLoaded", function () {
    const fietsLijst = document.getElementById("fiets-lijst");
    const huurButton = document.getElementById("huur-button");
    const verhuurFormulier = document.getElementById("verhuur-formulier");
    const gekozenFiets = document.getElementById("gekozen-fiets");
    const gegevensForm = document.getElementById("gegevens-form");
    const bevestiging = document.getElementById("bevestiging");

    // Fietsen laden uit een .txt-bestand
    if (!window.location.pathname.endsWith("verhuur.html")) return;

    huurButton.addEventListener("click", function () {
        const geselecteerdeFiets = document.querySelector(".fiets-checkbox:checked");
        if (!geselecteerdeFiets) {
            alert("Selecteer een fiets om te huren.");
            return;
        }

        gekozenFiets.textContent = geselecteerdeFiets.dataset.fiets;
        verhuurFormulier.classList.remove("hidden");
    });

    gegevensForm.addEventListener("submit", function (e) {
        e.preventDefault();
        bevestiging.classList.remove("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.endsWith("homepage.html")) return
    const welcomeMessage = document.getElementById("welcomeMessage");
    const messageBackground = document.getElementsByClassName("welcome-text")[0];
    const slider = document.getElementsByClassName("slider")[0];

    // Add a click event listener to hide the welcome message
    welcomeMessage.addEventListener("click", function () {
        messageBackground.style.transition = "opacity 1s ease, visibility 1s ease";
        messageBackground.style.opacity = "0";
        messageBackground.style.visibility = "hidden";
        setTimeout(() => {
            slider.style.transition = "all 1s ease";
            messageBackground.style.display = "none";
        }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.endsWith("homepage.html")) return;
    const winkelStatus = document.querySelector(".winkelStatus-shown");
    const statusText = document.querySelector(".status");
    const mainElement = document.querySelector("main");
    const welcomeMessage = document.getElementsByClassName("welcome-text")[0];

    // Openingstijden (aanpassen indien nodig)
    const openingstijden = {
        maandag: { open: "09:00", close: "18:00" },
        dinsdag: { open: "09:00", close: "18:00" },
        woensdag: { open: "09:00", close: "18:00" },
        donderdag: { open: "09:00", close: "18:00" },
        vrijdag: { open: "09:00", close: "18:00" },
        zaterdag: { open: "09:00", close: "20:00" },
        zondag: { open: null, close: null }, // Gesloten
    };

    // Controleer of de winkel open is
    function isWinkelOpen() {
        const now = new Date();
        const dayNames = [
            "zondag",
            "maandag",
            "dinsdag",
            "woensdag",
            "donderdag",
            "vrijdag",
            "zaterdag",
        ];
        const today = dayNames[now.getDay()];
        const currentTime = now.toTimeString().slice(0, 5); // Formatteer als HH:MM

        const tijden = openingstijden[today];
        if (!tijden.open || !tijden.close) {
            return false; // Gesloten
        }

        return currentTime >= tijden.open && currentTime <= tijden.close;
    }

    // Toon de winkelstatus na 5 seconden
    setTimeout(() => {
        winkelStatus.style.opacity = "1";
        winkelStatus.style.pointerEvents = "auto";
        winkelStatus.style.transition = "opacity 0.5s ease";

        if (isWinkelOpen()) {
            statusText.textContent = "Geopend";
            statusText.id = "geopend";
        } else {
            statusText.textContent = "Gesloten";
            statusText.id = "gesloten";
        }
    }, 5000);

    // Verberg de popup en vervang door een knop
    winkelStatus.addEventListener("click", function () {
        winkelStatus.style.transition = "all 0.5s ease";
        setTimeout(() => {
            winkelStatus.classList.add("winkelStatus-hidden");
            winkelStatus.classList.remove("winkelStatus-shown");
        }, 250);

        const button = document.createElement("button");
        button.style.opacity = "0";
        button.textContent = "Toon winkelstatus";
        button.style.marginTop = "20px";
        button.style.width = "100px";
        button.style.height = "50px";
        setTimeout(() => {
            button.style.transition = "opacity 0.5s ease";
            button.style.opacity = "1";
        }, 500);
        button.style.right = "46.5%";
        button.style.top = "-30px";
        button.style.position = "absolute";
        button.style.paddingTop = "10px";
        button.style.backgroundColor = "#465e79";
        button.style.border = "1px solid #000";
        button.style.color = "#fff";
        button.addEventListener("click", function () {
            button.style.transition = "opacity 0.25s ease";
            button.style.opacity = "0";
            winkelStatus.style.display = "flex";
            winkelStatus.style.opacity = "1";
            winkelStatus.style.pointerEvents = "auto";
            winkelStatus.classList.add("winkelStatus-shown");
            winkelStatus.classList.remove("winkelStatus-hidden");
            welcomeMessage.style.display = "block";
            setTimeout(() => {
            welcomeMessage.style.transition = "all 1s ease";
            welcomeMessage.style.visibility = "visible";
            welcomeMessage.style.opacity = "1";
            }
            , 500);
        });

        mainElement.appendChild(button);
    });
});

function historieText() {
    fetch('/Documents/historie.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("historie").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("historie").innerHTML = "Error: Kan historie.txt niet laden.";
        });
}

function eigenaarText() {
    fetch('/Documents/eigenaar.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("eigenaar").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("eigenaar").innerHTML = "Error: Kan eigenaar.txt niet laden.";
        });
}

function monteursText() {
    fetch('/Documents/monteurs.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("monteurs").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("monteurs").innerHTML = "Error: Kan monteurs.txt niet laden.";
        });
}

function missieText() {
    fetch('/Documents/missie.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("missieBericht").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("missieBericht").innerHTML = "Error: Kan missie.txt niet laden.";
        });
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("over.html")) {
        historieText();
        eigenaarText();
        monteursText();
        missieText();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("header input[type='text']");
    const searchButton = document.querySelector("header button");

    // Zoekwoorden en bijbehorende pagina's
    const zoekwoorden = {
        "home": "homepage.html",
        "fietsen": "fietsen.html",
        "verhuur": "verhuur.html",
        "contact": "contact.html",
        "over ons": "over.html",
        "steun": "steun.html",
        "algemene voorwaarden": "algemene_voorwaarden.html",
        "fluitend fonds": "ff.html"
    };

    searchButton.addEventListener("click", function () {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            alert("Voer een zoekterm in.");
            return;
        }

        // Controleer of de zoekterm overeenkomt met een pagina
        for (const [term, pagina] of Object.entries(zoekwoorden)) {
            if (term.includes(query)) {
                window.location.href = pagina; // Navigeer naar de bijbehorende pagina
                return;
            }
        }

        // Als geen pagina wordt gevonden, zoek naar elementen op de huidige pagina
        const elements = document.querySelectorAll("main, header, footer, nav *"); // Zoek in alle subelementen
        let found = false;

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                found = true;

                // Highlight alleen het specifieke element
                element.style.backgroundColor = "#9aafc7aa"; // Highlight het element
                element.scrollIntoView({ behavior: "smooth", block: "center" });

                // Verwijder highlight na 2 seconden
                setTimeout(() => {
                    element.style.backgroundColor = "";
                }, 2000);
            }
        });

        if (!found) {
            alert("Geen resultaten gevonden voor: " + query);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fietsModal = document.getElementById("fietsModal");
    const fietsDetails = document.getElementById("fietsDetails");
    const aantalInput = document.getElementById("aantal");

    function toonFietsDetails(naam, prijs, afbeelding, beschrijving) {
        fietsDetails.innerHTML = `
            <img src="${afbeelding}" alt="${naam}">
            <h2>${naam}</h2>
            <p>${beschrijving}</p>
            <p><strong>Prijs:</strong> €${prijs}</p>
        `;
        fietsModal.classList.add("show");
    }

    function sluitModal() {
        fietsModal.classList.remove("show");
    }

    // Voeg event listeners toe aan de "Koop nu"-knoppen
    document.querySelectorAll(".koop-knop").forEach(button => {
        button.addEventListener("click", function () {
            const fietsElement = this.closest(".fiets");
            const naam = fietsElement.querySelector("h3").textContent;
            const prijs = fietsElement.querySelector(".prijs").textContent.replace("€", "");
            const afbeelding = fietsElement.querySelector("img").src;
            const beschrijving = fietsElement.querySelector("p").textContent;

            toonFietsDetails(naam, prijs, afbeelding, beschrijving);
        });
    });

    // Sluit de modal wanneer de sluitknop wordt geklikt
    document.querySelector(".close-button").addEventListener("click", sluitModal);
});

document.addEventListener("DOMContentLoaded", function () {
    const winkelmand = JSON.parse(sessionStorage.getItem("winkelmand")) || [];
    const winkelmandModal = document.getElementById("winkelmandModal");
    const winkelmandInhoud = document.getElementById("winkelmandInhoud");
    const winkelmandTotaal = document.getElementById("winkelmandTotaal");

    console.log("Winkelmand opgehaald:", winkelmand);

    function voegToeAanWinkelmand(naam, prijs, aantal, dagen = null, huur = false) {
        const winkelmand = JSON.parse(sessionStorage.getItem("winkelmand")) || [];
        const bestaandeItem = winkelmand.find(item => item.naam === naam && item.huur);
    
        if (bestaandeItem) {
            if (huur) {
                bestaandeItem.dagen += dagen; // Voeg dagen toe voor huurfietsen
            } else {
                bestaandeItem.aantal += aantal; // Voeg aantal toe voor koopfietsen
            }
        } else {
            winkelmand.push({
                naam,
                prijs: parseFloat(prijs), // Zorg ervoor dat de prijs een numerieke waarde is
                aantal,
                dagen,
                huur
            });
        }
    
        sessionStorage.setItem("winkelmand", JSON.stringify(winkelmand));
        console.log("Winkelmand opgeslagen:", JSON.parse(sessionStorage.getItem("winkelmand")));
    }

    function toonWinkelmand() {
        const winkelmand = JSON.parse(sessionStorage.getItem("winkelmand")) || [];
        const winkelmandModal = document.getElementById("winkelmandModal");
        const winkelmandInhoud = document.getElementById("winkelmandInhoud");
        const winkelmandTotaal = document.getElementById("winkelmandTotaal");
    
        if (winkelmand.length === 0) {
            winkelmandInhoud.innerHTML = "<p>Je winkelmand is leeg.</p>";
            winkelmandTotaal.textContent = "0";
        } else {
            let totaal = 0;
            let koopFietsenHTML = "<h3>Koopfietsen</h3>";
            let huurFietsenHTML = "<h3>Huurfietsen</h3>";
    
            winkelmandInhoud.innerHTML = "";
    
            winkelmand.forEach((item, index) => {
                const itemTotaal = item.huur
                    ? item.prijs * item.dagen * item.aantal // Bereken totaal voor huurfietsen
                    : item.prijs * item.aantal; // Bereken totaal voor koopfietsen
                totaal += itemTotaal;
    
                if (item.huur) {
                    huurFietsenHTML += `
                        <div class="winkelmand-item">
                            <p>${item.type}</p>
                            <label for="aantal-${index}">Aantal fietsen:</label>
                            <input type="number" id="aantal-${index}" data-id="${index}" value="${item.aantal}" min="1" class="aantal-input">
                            <label for="dagen-${index}">Aantal dagen:</label>
                            <input type="number" id="dagen-${index}" data-id="${index}" value="${item.dagen}" min="1" class="dagen-input">
                            <p>Prijs per dag per fiets: €${item.prijs.toFixed(2)}</p>
                            <p>Totaal: €${itemTotaal.toFixed(2)}</p>
                        </div>
                    `;
                } else {
                    koopFietsenHTML += `
                        <div class="winkelmand-item">
                            <p>${item.naam}</p>
                            <label for="aantal-${index}">Aantal:</label>
                            <input type="number" id="aantal-${index}" data-id="${index}" value="${item.aantal}" min="1" class="aantal-input">
                            <p>Prijs per stuk: €${item.prijs.toFixed(2)}</p>
                            <p>Totaal: €${itemTotaal.toFixed(2)}</p>
                        </div>
                    `;
                }
            });
    
            winkelmandInhoud.innerHTML = koopFietsenHTML + huurFietsenHTML;
            winkelmandTotaal.textContent = totaal.toFixed(2);
    
            // Voeg event listeners toe aan de invoervelden voor aantal fietsen
            document.querySelectorAll(".aantal-input").forEach((input) => {
                input.addEventListener("change", function () {
                    const index = parseInt(this.dataset.id); // Haal de juiste index op uit het data-id attribuut
                    const nieuwAantal = parseInt(this.value);
                    if (nieuwAantal < 1) {
                        alert("Het aantal fietsen moet minstens 1 zijn.");
                        this.value = winkelmand[index].aantal; // Reset naar het vorige aantal
                        return;
                    }
            
                    // Werk het aantal fietsen bij in de winkelmand
                    winkelmand[index].aantal = nieuwAantal;
                    sessionStorage.setItem("winkelmand", JSON.stringify(winkelmand)); // Sla de nieuwe waarde op
                    toonWinkelmand(); // Werk de weergave bij
                });
            });
            
            // Voeg event listeners toe aan de invoervelden voor aantal dagen
            document.querySelectorAll(".dagen-input").forEach((input) => {
                input.addEventListener("change", function () {
                    const index = parseInt(this.dataset.id); // Haal de juiste index op uit het data-id attribuut
                    const nieuweDagen = parseInt(this.value);
                    if (nieuweDagen < 1) {
                        alert("Het aantal dagen moet minstens 1 zijn.");
                        this.value = winkelmand[index].dagen; // Reset naar het vorige aantal dagen
                        return;
                    }
            
                    // Werk het aantal dagen bij in de winkelmand
                    winkelmand[index].dagen = nieuweDagen;
                    sessionStorage.setItem("winkelmand", JSON.stringify(winkelmand)); // Sla de nieuwe waarde op
                    toonWinkelmand(); // Werk de weergave bij
                });
            });
        }
    
        winkelmandModal.classList.add("show");
    }
    
    // Maak de functies globaal toegankelijk
    window.toonWinkelmand = toonWinkelmand;
    window.sluitWinkelmand = sluitWinkelmand;
    window.afrekenen = afrekenen;

    function sluitWinkelmand() {
        winkelmandModal.classList.remove("show");
    }

    function afrekenen() {
        window.location.href = "afrekenen.html";
    }

    function sluitModal() {
        fietsModal.classList.remove("show");
    }

    // Voeg event listener toe aan de "Toevoegen aan winkelmand"-knop
    document.getElementById("toevoegenAanMand").addEventListener("click", function () {
        const naam = document.querySelector("#fietsDetails h2").textContent;
        const prijs = parseFloat(document.querySelector("#fietsDetails p strong").nextSibling.textContent.replace("€", ""));
        const aantal = parseInt(document.getElementById("aantal").value);
        sluitModal();
        voegToeAanWinkelmand(naam, prijs, aantal);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("afrekenen.html")) {
        const winkelmandInhoud = document.getElementById("winkelmandInhoud");
        const winkelmandTotaal = document.getElementById("winkelmandTotaal");
        const afrekenForm = document.getElementById("afrekenForm");

        // Haal winkelmandgegevens op uit sessionStorage
        const winkelmand = JSON.parse(sessionStorage.getItem("winkelmand")) || [];
        console.log("Winkelmand opgehaald op afrekenpagina:", winkelmand);

        function updateWinkelmand() {
            if (winkelmand.length === 0) {
                winkelmandInhoud.innerHTML = "<p>Je winkelmand is leeg.</p>";
                winkelmandTotaal.textContent = "0";
                return;
            }

            let totaal = 0;
            let koopFietsenHTML = "<h3>Koopfietsen</h3>";
            let huurFietsenHTML = "<h3>Huurfietsen</h3>";

            winkelmandInhoud.innerHTML = "";

            winkelmand.forEach((item, index) => {
                const itemTotaal = item.prijs * (item.dagen || item.aantal); // Gebruik `dagen` voor huurfietsen en `aantal` voor koopfietsen
                totaal += itemTotaal;

                if (item.huur) {
                    // Huurfietsen
                    huurFietsenHTML += `
                        <div class="winkelmand-item">
                            <p>${item.dagen} dagen - ${item.type}</p>
                            <p>Prijs per dag: €${parseFloat(item.prijs).toFixed(2)}</p>
                            <p>Totaal: €${itemTotaal.toFixed(2)}</p>
                            <button class="verwijder-knop" data-index="${index}">Verwijderen</button>
                        </div>
                    `;
                } else {
                    // Koopfietsen
                    koopFietsenHTML += `
                        <div class="winkelmand-item">
                            <p>${item.aantal}x ${item.naam}</p>
                            <p>Prijs per stuk: €${parseFloat(item.prijs).toFixed(2)}</p>
                            <p>Totaal: €${itemTotaal.toFixed(2)}</p>
                            <button class="verwijder-knop" data-index="${index}">Verwijderen</button>
                        </div>
                    `;
                }
            });

            // Voeg de secties toe aan de winkelmandweergave
            winkelmandInhoud.innerHTML = koopFietsenHTML + huurFietsenHTML;
            winkelmandTotaal.textContent = totaal.toFixed(2);

            // Voeg event listeners toe aan de verwijderknoppen
            document.querySelectorAll(".verwijder-knop").forEach(button => {
                button.addEventListener("click", function () {
                    const index = this.dataset.index;
                    winkelmand.splice(index, 1); // Verwijder het item uit de winkelmand
                    sessionStorage.setItem("winkelmand", JSON.stringify(winkelmand));
                    updateWinkelmand();
                });
            });
        }

        updateWinkelmand();

        // Verwerk het formulier
        afrekenForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Bedankt voor je bestelling! Je ontvangt een bevestiging per e-mail.");
            sessionStorage.removeItem("winkelmand"); // Leeg de winkelmand
            window.location.href = "homepage.html"; // Terug naar de homepage
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("verhuur.html")) {
        const fietsLijst = document.getElementById("fiets-lijst");
        const huurButton = document.getElementById("huur-button");
        const verhuurModal = document.getElementById("verhuurModal");
        const gekozenFietsenLijst = document.getElementById("gekozenFietsenLijst");
        const aantalDagenInput = document.getElementById("aantalDagen");
        const toevoegenAanWinkelmandButton = document.getElementById("toevoegenAanWinkelmand");

        let gekozenFietsen = [];

        // Fietsen laden uit een .txt-bestand
        fetch('/Documents/huurLijst.txt')
            .then(response => response.text())
            .then(data => {
                const fietsen = JSON.parse(data);
                fietsen.forEach((fiets, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><input type="checkbox" class="fiets-checkbox" data-fiets="${fiets.type}" data-prijs="${fiets.prijs}"></td>
                        <td>${fiets.type}</td>
                        <td>${fiets.prijs}</td>
                    `;
                    fietsLijst.appendChild(row);
                });
            });

        // Open de verhuurmodal met de geselecteerde fietsen
        huurButton.addEventListener("click", function () {
            const geselecteerdeCheckboxen = document.querySelectorAll(".fiets-checkbox:checked");
            if (geselecteerdeCheckboxen.length === 0) {
                alert("Selecteer minstens één fiets om te huren.");
                return;
            }

            gekozenFietsen = Array.from(geselecteerdeCheckboxen).map(checkbox => ({
                type: checkbox.dataset.fiets,
                prijs: checkbox.dataset.prijs
            }));

            gekozenFietsenLijst.innerHTML = gekozenFietsen.map((fiets, index) => `
                <div class="gekozen-fiets-item">
                    <p>${fiets.type} - ${fiets.prijs} per dag</p>
                    <label for="aantalFietsen-${index}">Aantal fietsen:</label>
                    <input type="number" id="aantalFietsen-${index}" value="1" min="1">
                    <label for="aantalDagen-${index}">Aantal dagen:</label>
                    <input type="number" id="aantalDagen-${index}" value="1" min="1">
                </div>
            `).join("");

            verhuurModal.classList.add("show");
        });

        // Sluit de verhuurmodal
        function sluitVerhuurModal() {
            verhuurModal.classList.remove("show");
        }
        window.sluitVerhuurModal = sluitVerhuurModal;

        // Voeg de gekozen fietsen toe aan de winkelmand
        toevoegenAanWinkelmandButton.addEventListener("click", function () {
            const winkelmand = JSON.parse(sessionStorage.getItem("winkelmand")) || [];

            gekozenFietsen.forEach((fiets, index) => {
                const aantalFietsen = parseInt(document.getElementById(`aantalFietsen-${index}`).value);
                const aantalDagen = parseInt(document.getElementById(`aantalDagen-${index}`).value);

                if (aantalFietsen < 1 || aantalDagen < 1) {
                    alert(`Het aantal fietsen en dagen voor ${fiets.type} moet minstens 1 zijn.`);
                    return;
                }

                const bestaandeItem = winkelmand.find(item => item.type === fiets.type && item.huur);
                if (bestaandeItem) {
                    bestaandeItem.dagen += aantalDagen; // Voeg dagen toe
                    bestaandeItem.aantal += aantalFietsen; // Voeg het aantal fietsen toe
                } else {
                    // Verwijder het euroteken en zet de prijs om naar een numerieke waarde
                    const prijsZonderEuro = fiets.prijs.replace("€", "").trim();
                    winkelmand.push({
                        type: fiets.type,
                        prijs: parseFloat(prijsZonderEuro), // Zorg ervoor dat de prijs een numerieke waarde is
                        dagen: aantalDagen,
                        aantal: aantalFietsen, // Sla het aantal fietsen op
                        huur: true
                    });
                }
            });

            sessionStorage.setItem("winkelmand", JSON.stringify(winkelmand));
            sluitVerhuurModal();
            alert("Fietsen toegevoegd aan de winkelmand!");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Werk de winkelmandweergave bij met de inhoud van sessionStorage
    updateWinkelmand();
});
