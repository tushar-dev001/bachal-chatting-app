import Button from "@mui/material/Button";

const Btn = ({title}) => {
  return (
    <Button variant="contained" className="btn">
      {title}
    </Button>
  );
};

export default Btn;
