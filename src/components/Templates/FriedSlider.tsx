import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

interface Props {
  defaultValue: number;
  setDonenessText: (newDonenessText: string) => void;
}

const FriedSlider = ({ defaultValue, setDonenessText }: Props) => {
  const labelStyles = {
    mt: "2",
    fontSize: "sm",
  };

  return (
    <Slider
      onChange={(val) => setDonenessText(valueToMark(val))}
      step={25}
      whiteSpace={"nowrap"}
      defaultValue={defaultValue}
    >
      <SliderMark value={0} {...labelStyles} ml={-4}>
        Very Soft
      </SliderMark>
      <SliderMark value={25} {...labelStyles} ml={-4}>
        Soft
      </SliderMark>
      <SliderMark value={50} {...labelStyles} ml={-6}>
        Normal
      </SliderMark>
      <SliderMark value={75} {...labelStyles} ml={-6}>
        Crispy
      </SliderMark>
      <SliderMark value={100} {...labelStyles} ml={-14}>
        Very Crispy
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export const markToValue = (mark: string) => {
  switch (mark) {
    case "Very Soft":
      return 0;
    case "Soft":
      return 25;
    case "Crispy":
      return 75;
    case "Very Crispy":
      return 100;
    default:
      return 50;
  }
};

export const valueToMark = (value: number) => {
  switch (value) {
    case 0:
      return "Very Soft";
    case 25:
      return "Soft";
    case 50:
      return "Normal";
    case 75:
      return "Crispy";
    case 100:
      return "Very Crispy";
    default:
      return "!!!;";
  }
};

export default FriedSlider;
