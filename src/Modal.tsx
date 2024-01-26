export default function Modal({ isModalOpen, setIsModalOpen }) {
    
    return isModalOpen && < div className = "modal d-flex align-items-center justify-content-center" >
        <div className="modal-dialog">
            <div className="modal-content bg-primary text-light p-4 fs-2">
                <button onClick={() => setIsModalOpen(false)} type="button" className="btn-close"></button>
                <p>Welcome to the card flip game, the game is designed to have you flip a card, and then flip another
                    card in order to get a match, if you get a match, great! the two cards will dissapear, if you don't?
                    the two cards will flip back again and you'll have to try again, beware of the timer!
                    Good luck!
                </p>
            </div>
        </div>
</div >
}