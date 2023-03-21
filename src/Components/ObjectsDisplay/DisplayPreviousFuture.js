import './ObjectsDisplay.css';
import { Link } from 'react-router-dom';
import dangerousPic from './../../Images/save-me.png';
import safePic from './../../Images/safe.png';
export default function PreviousFuture({ id, dangerous }) {
  return (
    <div>
      {dangerous ? (
        <>
          <img
            className="safe-dangerous-image"
            alt="Earth holding a save me sign"
            src={dangerousPic}
          ></img>
        </>
      ) : (
        <>
          <img
            className="safe-dangerous-image"
            alt="Earth is safe"
            src={safePic}
          ></img>
        </>
      )}
    </div>
  );
}
