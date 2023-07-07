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

const DonenessSlider = ({ defaultValue, setDonenessText }: Props) => {
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
        Hard
      </SliderMark>
      <SliderMark value={100} {...labelStyles} ml={-14}>
        Very Hard
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
    case "Hard":
      return 75;
    case "Very Hard":
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
      return "Hard";
    case 100:
      return "Very Hard";
    default:
      return "!!!;";
  }
};

export default DonenessSlider;
