import React from "react";
import Button from "../../Button";

import "./styles.scss";

type Props = {
    handleAgree: () => void;
    handleDisagree: () => void;
}

const ConfimModal: React.FC<Props> = ({ handleAgree, handleDisagree }) => {
    return (
        <div className="confirm-modal">
            <div className="confirm-modal__body">
                <h4 className="confirm-modal__title">Начать новую игру?</h4>
                <p className="confirm-modal__message">Весь прогресс будет утерян</p>
                <div className="confirm-modal__actions">
                    <Button type="success" onClick={handleAgree}>Да</Button>
                    <Button type="danger" onClick={handleDisagree}>Нет</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfimModal;
