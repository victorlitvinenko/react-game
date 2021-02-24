import cn from 'classnames';

import './btn.scss';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: JSX.Element;
};

const Btn: React.FC<Props> = ({ onClick, disabled, children }) => {
  return (
    <button
      type="button"
      className={cn('button', {
        'button--disabled': disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
