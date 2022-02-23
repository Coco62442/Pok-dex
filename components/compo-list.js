app.component("compo-list", {
    template:
        /*html*/`
        <li class="pokemon" v-for="index in data.dataInfo" :key="index">
            <a href="#" @click="details(index.id)">
                <div class="tile" :title="index.name">
                    <h1>
                        {{ index.name }}
                    </h1>
                    <img :src="index.sprites.front_default" :alt="index.name">
                    <p>{{ index.id }}</p>
                </div>
            </a>
        </li>
        `
})