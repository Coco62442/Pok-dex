const app = Vue.createApp ({
    data() {
        return {
            dataInfo: []
        }
    },

    beforeMount() {
        this.getListPokemon()
    },

    methods: {
        async getListPokemon() {

            // Recupere le nombre de Pokemon a recuperer
            try {
                let repTaille = await fetch("https://pokeapi.co/api/v2/pokemon")
                if (repTaille.ok) {
                    let buffer = await repTaille.json()
                    // nbPokemon = buffer.count
                    nbPokemon = 400 // Limitation artificielle
                } 
                else {
                    console.log("Erreur du serveur")
                    alert("Le chargement des donnés n'a pas pu être fait")
                }
            }
            catch (err) {
                console.log(err)
            }

            // Permet de recuperer la liste du nombre de Pokemon definis par la variable nbPokemon
            // Afin d'avoir acces au tableau results
            try {
                let repAllPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + nbPokemon)
                if (repAllPokemon.ok) {
                    let listPoke = await repAllPokemon.json()
                    dataListe = listPoke
                } 
                else {
                    console.log("Erreur du serveur")
                    alert("Le chargement des donnés n'a pas pu être fait")
                }
            } 
            catch (err) {
                console.log(err)
            }

            // ##########################################################################################


            // Boucle qui récupère pour chaque url de Pokemon les donnees de chaque Pokemon (id, name, abilities, types,...)
            // En parcourant le tableau results obtenu juste avant
            for (let i = 0; i < dataListe.results.length; i++) {                
            
                try {
                    let repUrl = await fetch(dataListe.results[i].url)
                    if (repUrl.ok) {
                        let data = await repUrl.json()
                        this.dataInfo[i] = data
                    }
                    else {
                        console.log("Erreur du serveur")
                        alert("Le chargement des donnés n'a pas pu être fait")
                    }
                } 
                catch (err) {
                    console.log(err)
                }
            }
        },

        // Fonction pour faire (afficher || disparaitre) la boite de dialogue
        details: function(id) {
                el = document.getElementById(id);
                el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
        },

    },
})