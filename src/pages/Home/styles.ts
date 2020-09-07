import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconRepository from 'react-native-vector-icons/Entypo';

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

export const ImageLogo = styled.Image`
  top: 20px;
`;
export const HeaderText = styled.Text`
  top: 30px;
  left: 38px;
  font-size: 32px;
  font-family: 'Roboto-Medium';
`;
export const Input = styled.TextInput`
  background-color: #ffff;
  font-family: 'Roboto-Regular';
  font-size: 16px;
  border-radius: 10px;
  width: 90%;
  height: 60px;
  padding-left: 10px;
  margin-top: 40px;
`;
export const Button = styled(RectButton)`
  border-radius: 10px;
  width: 80%;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  background-color: #04d361;
`;

export const IconButton = styled(Icon)`
  left: 28px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-size: 24px;
  right: 110px;
  top: -2px;
  font-family: 'Roboto-Regular';
`;

export const CardButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  width: 370px;
  height: 70px;
  border-radius: 5px;
  background-color: #ffff;
  padding-left: 5px;
  margin-top: 20px;
`;
export const ImageCard = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
export const CardTexts = styled.View`
  padding-left: 10px;
`;
export const CardTitle = styled.Text`
  max-width: 240px;
  font-weight: bold;
  color: #3a3a3a;
`;
export const CardSubTitle = styled.Text`
  max-width: 240px;
  color: #a8a8b3;
`;
export const IconCardRepository = styled(IconRepository)`
  left: 22px;
`;
