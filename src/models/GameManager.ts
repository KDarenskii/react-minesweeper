export default class GameManager {
    private timer: number = 0;
    isPlaying: boolean = false;

    public increaseTimer() {
        this.timer++;
    }
    public startGame() {
        this.isPlaying = true;
    }
    public finishGame() {
        this.isPlaying = false;
    }
} 