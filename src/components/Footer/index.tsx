import Link from 'next/link';

import logoImg from '../../../static/logo.png';
import { FooterBase, Logo } from './styles';

const Footer: React.FC = () => {
  return (
    <FooterBase>
      <Link href="/">
        <Logo src={logoImg} alt="Logo" />
      </Link>
      <p>Desenvolvido por Styllth Saraiva Ribeiro</p>
    </FooterBase>
  );
};

export default Footer;
