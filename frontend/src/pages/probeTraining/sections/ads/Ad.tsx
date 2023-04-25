export const Ad = (props: any) => {
  return (
      <div className="content">
        <img src={props.src} alt="" />
        <div className="text">
          {props.children}
        </div>
      </div>
  )
}
