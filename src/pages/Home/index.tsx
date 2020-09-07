import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Platform, Keyboard } from 'react-native';
import api from '../../services/api';
import {
  IconButton,
  Container,
  ImageLogo,
  CardButton,
  HeaderText,
  CardTitle,
  CardSubTitle,
  Input,
  IconCardRepository,
  Button,
  CardTexts,
  ImageCard,
  ButtonText,
} from './styles';

import LogoBackground from '../../assets/Github.png';
import logo from '../../assets/Logo.png';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Home: React.FC = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const _keyboardShown = useCallback(() => setKeyboardOpen(true), []);
  const _keyboardHidden = useCallback(() => setKeyboardOpen(false), []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      Keyboard.addListener('keyboardDidShow', _keyboardShown);
    }

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardShown);
    };
  }, [_keyboardShown]);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      Keyboard.addListener('keyboardDidHide', _keyboardHidden);
    }

    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardHidden);
    };
  }, [_keyboardHidden]);
  const [inputText, setInputText] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const navigation = useNavigation();

  async function NewAddRepo() {
    const response = await api.get<Repository>(`repos/${inputText}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);

    setInputText('');
  }

  function navigateToRepository(full_name: string) {
    navigation.navigate('Repository', {
      full_name,
    });
  }

  return (
    <Container source={LogoBackground}>
      <ImageLogo source={logo} />
      <HeaderText>Explore repositórios no Github.</HeaderText>

      <Input
        value={inputText}
        placeholder="autor/nome do repositório"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setInputText}
      />

      <FlatList
        data={repositories}
        keyExtractor={repository => repository.full_name}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        renderItem={({ item: repository }) => (
          <CardButton
            onPress={() => navigateToRepository(repository.full_name)}
          >
            <ImageCard
              source={{
                uri: `${repository.owner.avatar_url}`,
              }}
            />
            <CardTexts>
              <CardTitle numberOfLines={1}>{repository.full_name}</CardTitle>
              <CardSubTitle>{repository.description}</CardSubTitle>
            </CardTexts>
            <IconCardRepository
              name="chevron-right"
              size={30}
              color="#CBCBD6"
            />
          </CardButton>
        )}
      />
      {(Platform.OS === 'ios' || !keyboardOpen) && (
        <Button>
          <IconButton name="compass" size={28} color="#fff" />
          <ButtonText onPress={NewAddRepo}>Pesquisar</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default Home;
