import Layout from '../components/Layout';
import LandingPage from './LandingPage';
import MyPage from './MyPage'; 

export default function Home() {
	return (
		<Layout title="LandingPage">
			<LandingPage />
      <MyPage /> 
		</Layout>
	);
}
