import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import LogoBackground from '../../assets/Github.png';
import {
  Container,
  ButtonBack,
  LogoButton,
  ButtonText,
  Avatar,
  Card,
  CardIssues,
  Title,
  SubTitle,
  CardIconIssue,
  NameRepo,
  BioRepo,
  CardInfo,
  CardInfoText,
  CardInfoTitle,
  CardInfoSubTitle,
} from './styles';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigation = useNavigation();
  const routes = useRoute();

  const routeParams = routes.params as Repository;

  useEffect(() => {
    api.get(`repos/${routeParams.full_name}`).then(response => {
      setRepository(response.data);
    });
    api.get(`repos/${routeParams.full_name}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [routeParams.full_name]);

  function BackNavigate() {
    navigation.goBack();
  }

  function handleIssue(html_url: string) {
    navigation.navigate('Issue', {
      html_url,
    });
  }

  return (
    <Container source={LogoBackground}>
      <ButtonBack onPress={BackNavigate}>
        <LogoButton name="arrowleft" size={26} color="#000000" />
        <ButtonText>Voltar</ButtonText>
      </ButtonBack>
      <Avatar
        source={{
          uri: `${repository?.owner.avatar_url}`,
        }}
      />
      <NameRepo numberOfLines={1}>{repository?.full_name}</NameRepo>
      <BioRepo>{repository?.description}</BioRepo>

      <CardInfo>
        <CardInfoText>
          <CardInfoTitle>{repository?.stargazers_count}</CardInfoTitle>
          <CardInfoSubTitle>Stars</CardInfoSubTitle>
        </CardInfoText>
        <CardInfoText>
          <CardInfoTitle>{repository?.forks_count}</CardInfoTitle>
          <CardInfoSubTitle>Forks</CardInfoSubTitle>
        </CardInfoText>
        <CardInfoText>
          <CardInfoTitle>{repository?.open_issues_count}</CardInfoTitle>
          <CardInfoSubTitle>Issues abertas</CardInfoSubTitle>
        </CardInfoText>
      </CardInfo>
      <FlatList
        data={issues}
        keyExtractor={issue => issue.title}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        renderItem={({ item: issue }) => (
          <Card onPress={() => handleIssue(issue.html_url)}>
            <CardIssues>
              <Title numberOfLines={1}>{issue.title}</Title>
              <SubTitle>{issue.user.login}</SubTitle>
            </CardIssues>
            <CardIconIssue name="chevron-right" size={20} color="#A8A8B3" />
          </Card>
        )}
      />
    </Container>
  );
};

export default Repository;
