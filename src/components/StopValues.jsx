const StopValues = ({videoset}) => {
  const {lat, lng} = videoset
  return(
    <div>
      <p className="heading"> Latitud </p>
      <p>{lat}</p>
      <p className="heading"> Longitud </p>
      <p>{lng}</p>
    </div>
  )
}

export default StopValues