type SpinnerProps = {
  mini?: boolean;
};

const Spinner = ({mini}: SpinnerProps) =>{
  return <div className={mini ? 'spinner-mini' : 'spinner'}></div>;
}

export {Spinner};
