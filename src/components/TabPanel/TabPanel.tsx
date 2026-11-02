interface Props {
  children: React.ReactNode;
  value: number;
  index: number;
}


export default function TabPanel(props: Props) {

  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {children}
    </div>
  )
}