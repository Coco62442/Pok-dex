app.component("pokedex", {
    template:
        /*html*/`
        <!-- input tag -->
        <input id="searchbar" onkeyup="search_pokemon()" type="text"
        name="search" placeholder="Search pokemon..">


        <!-- list -->
        <ul id="tiles-panel">
            <compo-list></compo-list>
            
            <compo-detail></compo-detail>
        </ul>
        `,

        data() {
            return {
                data: {
                    dataListe: {},
                    dataInfo: []
                }
            }
        },

        beforeMount() {
            this.getListPokemon()
        },

        methods: {
            async getListPokemon() {

                try {
                    let repTaille = await fetch("https://pokeapi.co/api/v2/pokemon")
                    if (repTaille.ok) {
                        let buffer = await repTaille.json()
                        nbPokemon = buffer.count
                        nbPokemon = 200
                    } 
                    else {
                        console.log("Erreur du serveur")
                        alert("Le chargement des donnés n'a pas pu être fait")
                    }
                }
                catch (err) {
                    console.log(err)
                }

                try {
                    let repAllPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + nbPokemon)
                    if (repAllPokemon.ok) {
                        let listPoke = await repAllPokemon.json()
                        this.data.dataListe = listPoke
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



                for (let i = 0; i < this.data.dataListe.results.length; i++) {                
                
                    try {
                        let repUrl = await fetch(this.data.dataListe.results[i].url)
                        if (repUrl.ok) {
                            let data = await repUrl.json()
                            this.data.dataInfo[i] = data
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

            details: function(id) {
                    el = document.getElementById(id);
                    el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
            },
        },
})