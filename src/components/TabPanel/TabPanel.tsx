interface Props {
  children: React.ReactNode;
  value: number;
  index: number;
}


export default function TabPanel(props: Props) {

  const { children, value, index } = props;

  return value === index ? children : null;
}