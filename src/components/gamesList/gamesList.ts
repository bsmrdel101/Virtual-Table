import { addGame, getGames } from "../../controllers/dashboardController";
import { ready } from "../../scripts/utils";
import { Game } from "../../scripts/types";
import gameCard from "./gameCard/gameCard";
import { joinDM } from "../../views/dashboardPage/dashboardPage";

let gameFormOpen: boolean = false;

export const setGamesList = (gamesList: Game[]) => {
    const gameListContent: Element = document.querySelector('.games-list__content')!;
    gameListContent.innerHTML = '';

    // Add all games from game list
    gamesList.forEach((game: Game) => {
        gameListContent.insertAdjacentHTML('beforeend', gameCard({ game: game }));
        bindEventsToGameCard(game);
    });

    // Add create campaign button at the end
    gameListContent.insertAdjacentHTML('beforeend', `
        <button class="games-list__button btn--hover">Create Campaign</button>
    `);    
};

const toggleGameForm = () => {
    gameFormOpen = !gameFormOpen;
    if (gameFormOpen) {
        document.querySelector('.games-list__content')?.insertAdjacentHTML('beforeend', `
            <form class="form--add-game">
                <input id="game-name-input" placeholder="name" required>
                <button class="button--submit btn--hover">Submit</button>
            </form>
        `);
        bindEventsToGamesListForm();
    } else {
        document.querySelector('.form--add-game')?.remove();
    }
};

const renderGamesList = async () => {
    const games: Game[] = await getGames();
    // const games: Game[] = [
    //     { id: 1, name: 'Test Campaign', code: '5sV54s' },
    // ];
    setGamesList(games);
};


const bindEventToCreateCampaign = () => {
    document.querySelector('.games-list__button')?.addEventListener('click', () => {
        toggleGameForm();
    });
};

const bindEventsToGamesListForm = () => {
    document.querySelector('.form--add-game')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const gameNameInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('game-name-input'));
        addGame({ name: gameNameInput.value });
    });
};

const bindEventsToGameCard = (game: Game) => {
    document.getElementById(`game-list__item-${game.id}`)?.addEventListener('click', () => {
        joinDM(game.code);
    });
};

export default function gamesList() {
    ready(async () => {
        renderGamesList();
        bindEventToCreateCampaign();
        // prevGame = await getPrevGame();
        // roomCode = prevGame.code;
        // document.getElementById('room-code-input').value = prevGame.code;
        // Get D&D api data
        // getCreatures();
    });

    return `
        <div class="games-list">
            <div class="games-list__content"></div>
        </div>
    `;
}
