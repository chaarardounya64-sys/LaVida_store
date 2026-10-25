const produits = [
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `pyjama${i + 1}`,
    nom: `Pyjama ${i + 1}`,
    image: `Pyjama${i + 1}.png`,
    prix: 150,
    categorie: "pyjama"
  })),

  {
    id: "parfum2",
    nom: "Vanilla Seduction",
    image: "Parfun2.png",
    prix: 150,
    categorie: "parfum"
  },
  {
    id: "parfum3",
    nom: "Rosé",
    image: "Parfun3.png",
    prix: 150,
    categorie: "parfum"
  },
  {
    id: "parfum4",
    nom: "Kiss My Lips",
    image: "Parfun4.png",
    prix: 150,
    categorie: "parfum"
  },
  {
    id: "parfum5",
    nom: "Casablanca",
    image: "Parfun5.png",
    prix: 150,
    categorie: "parfum"
  }
];

let panier = [];

function afficherProduits(categorie, conteneurId) {
  const conteneur = document.getElementById(conteneurId);

  conteneur.innerHTML = produits
    .filter(p => p.categorie === categorie)
    .map(p => `
      <article class="product">
        <img
          src="${p.image}"
          alt="${p.nom}"
          loading="lazy"
          onerror="this.alt='Image indisponible'; this.style.display='none';"
        >
        <h3>${p.nom}</h3>
        <p class="price">${p.prix} DH</p>
        <button onclick="ajouterAuPanier('${p.id}')">
          Ajouter au panier
        </button>
      </article>
    `).join("");
}

function ajouterAuPanier(id) {
  const article = produits.find(p => p.id === id);
  const present = panier.find(p => p.id === id);

  if (present) {
    present.quantite++;
  } else {
    panier.push({ ...article, quantite: 1 });
  }

  afficherPanier();
}

function changerQuantite(id, variation) {
  const article = panier.find(p => p.id === id);
  if (!article) return;

  article.quantite += variation;

  if (article.quantite <= 0) {
    panier = panier.filter(p => p.id !== id);
  }

  afficherPanier();
}

function afficherPanier() {
  const conteneur = document.getElementById("contenu-panier");

  if (panier.length === 0) {
    conteneur.innerHTML = "<p>Votre panier est vide.</p>";
  } else {
    conteneur.innerHTML = panier.map(p => `
      <div class="cart-item">
        <div>
          <strong>${p.nom}</strong>
          <p>${p.prix} DH × ${p.quantite}</p>
        </div>
        <div>
          <button onclick="changerQuantite('${p.id}', -1)">−</button>
          <span>${p.quantite}</span>
          <button onclick="changerQuantite('${p.id}', 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  const total = panier.reduce(
    (somme, p) => somme + p.prix * p.quantite, 0
  );

  document.getElementById("total").textContent = total;
}

document.getElementById("commande").addEventListener("submit", function(e) {
  e.preventDefault();

  if (panier.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const nom = document.getElementById("nom").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const adresse = document.getElementById("adresse").value.trim();

  const numero = "212600000000"; // Remplace par ton numéro WhatsApp

  const details = panier.map(p =>
    `- ${p.nom} x ${p.quantite} : ${p.prix * p.quantite} DH`
  ).join("\n");

  const total = panier.reduce(
    (somme, p) => somme + p.prix * p.quantite, 0
  );

  const message =
`Bonjour LaVida !
Nom : ${nom}
Téléphone : ${telephone}
Adresse : ${adresse}

Ma commande :
${details}

Total : ${total} DH`;

  window.open(
    `https://wa.me/${numero}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});

afficherProduits("pyjama", "liste-pyjamas");
afficherProduits("parfum", "liste-parfums");
afficherPanier();
