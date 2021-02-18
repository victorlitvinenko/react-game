import React, { useState } from 'react';

import './cube.scss';

interface ICubeProps {
  rotate: number;
}

const Cube: React.FC<ICubeProps> = ({ rotate }) => {
  const [rotation, setRotation] = useState(rotate);

  return (
    <div className="cube">
      <button
        type="button"
        onClick={() => setRotation(rotation + 1)}
        style={{
          transform: `rotate(${rotation * 90}deg)`,
        }}
      >
        <h4>{rotation % 4}</h4>
        <div className="cube__icon">
          <div />
          <div />
          <div />
        </div>
      </button>
    </div>
  );
};

export default Cube;
