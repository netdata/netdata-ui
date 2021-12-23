const useInputStyles = ({ size }) => {
  switch (size) {
    case "tiny":
      return {
        height: "30px",
        padding: "5px 8px 5px 8px",
      }
    case "small":
      return {
        height: "34px",
        padding: "7px 12px 7px 12px",
      }
    default: {
      return {
        height: "42px",
        padding: "11px 16px 11px 16px",
      }
    }
  }
}

export default useInputStyles
