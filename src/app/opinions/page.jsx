// app/opinions/page.jsx
import OpinionsForm from './OpinionsForm';

export const metadata = {
  title: 'Opiniones',
  description: 'Comparte tu experiencia con nuestro servicio',
};

export default function OpinionsPage() {
  return (
    <main>
      <OpinionsForm />
    </main>
  );
}