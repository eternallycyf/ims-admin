import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.get('/api/get-user-info').then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <div>
        <div className="flex-center" mb="20" font="moneItalic">
          font-size
        </div>
        <pre className="flex-center">
          <code color="primary" font="code" hover:text="blue">
            useEffect
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App;
