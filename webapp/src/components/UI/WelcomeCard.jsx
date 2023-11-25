import React from 'react';
import './WelcomeCard.css';

function WelcomeCard(props) {
  return (
    <a href={props.url} class="wlcm_card_box__link mb-3">
        <div class="wlcm_card_square">
            <h3 class="wwlcm_card_square__title pt-5 mb-5">{props.title}</h3>
            <div class="wlcm_card_square__icon mt-3">
                <img src={props.imgPath} alt={props.imgTitle} />
            </div>
        </div>
    </a>
  )
}

export default WelcomeCard