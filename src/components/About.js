import React from "react";
import claribelle from "./../assets/ClaribelleRef.png"
import natasha from "./../assets/NatashaRef.png"
import sprite from "./../assets/SpriteRef.png"

const About = () => {
    return (
<div>
      <div>
        <h1 className="header">Let Us Introduce Ourselves!</h1>
        <h1 className="header">Claribelle</h1>
        <img src={claribelle} height="550px" width="450px" className="mascot"></img>
        <h1 className="bdy">
          Claribelle is a born-and-raised aristocrat with a major interest in Victorian fashion. When she was a child, she commonly dressed in classical style clothing, especially for special occasions, which she remembers fondly. However, despite her deep interest in fashion, her parents wanted her to become a nurse, which she did not accept. She quickly joined the alt fashion scene when she moved out, as she felt accepted for the first time. Nowadays, she's a connoisseur in Lolita fashion, which is based off of the classical and Victorian styles she loves so much.
        </h1>
        <h1 className="header">Natasha</h1>
        <img src={natasha} height="550px" width="450px" className="mascot"></img>
        <h1 className="bdy">
          Natasha is a former cheerleader that knows how to stay cool, even during disputes between her friends. She's commonly known as the voice of reason, a skill and title developed throughout years of being the most reasonable one. She uses fashion as a means to escape from stress and as a way to connect with others. In particular, she's passionate about the extravagant style of gyaru, which features bold makeup and hip clothes.
        </h1>
        <h1 className="header">Sprite</h1>
        <img src={sprite} height="550px" width="450px" className="mascot"></img>
        <h1 className="bdy">
          Sprite is a mysterious alien that crashed onto Earth after her home planet was destroyed. She immediately found a love for Harajuku fashion once she landed, as that reminded her of the fashion her people used to wear. Despite having to create a new identity on Earth, she still remains the life of the party, giving her friends a sense of optimism whenever they need it. 
        </h1>
      </div>
      
    </div>
    );
}

export default About;