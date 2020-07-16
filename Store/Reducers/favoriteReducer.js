

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(
                item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // le film est déjà dans les favoris, on le supprime donc de la liste
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => 
                    index !== favoriteFilmIndex )
                }
            }
            else {
                // le film n'est pas dans la liste, on l'ajoute donc à la liste
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite