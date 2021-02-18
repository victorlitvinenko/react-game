import React, { useState } from 'react';

import './cube.scss';

interface ICubeProps {
  rotationsCount: number;
}

const Cube: React.FC<ICubeProps> = ({ rotationsCount }) => {
  const [rotation, setRotation] = useState(rotationsCount);

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
