import './Buttons.scss'

const PrimaryButton = (props: any) => {
  return (
    <div className='button primary-btn'>
      <a href={props.href}>{props.children}</a>
    </div>
  )
}

const SecondaryButton = (props: any) => {
  return (
    <div className="button secondary-btn">
      <a href="">{props.children}</a>
    </div>
  );
};

export default PrimaryButton;
export { SecondaryButton };
