import './CreatedBy.css';
import stars from './../../Images/stars.png';

export default function CreatedBy() {
  return (
    <div className="created-container">
      <img className="left-star stars" src={stars} alt="stars"></img>
      <p>
        Designed & Developed by
        <a href="https://violeta.cique.es/"> Violeta Cique</a>- 2023
        <br />
        <a href="https://github.com/violetacf/near-earth">See in GitHub</a>
      </p>
      <img className="right-star stars" src={stars} alt="stars"></img>
    </div>
  );
}
