const COMPONENTS = [
  {
    name: "Alert",
    path: "./src/components/vibes/primitives/alert",
    props: `interface Props {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: ReactNode;
  description?: string;
  dismissLabel?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}`,
    example: `import { Alert } from '@/vibes/soul/primitives/alert'
import { useState } from 'react'

<Alert variant="success" message="1 item added to your cart" showAlert={showAlert} onClose={setShowAlert}/>
`,
  },
];
/* 

<component name="Alert" path = "./src/components/vibes/primitives/alert">
    An Alert is used to display important information to the user. It is typically styled with a distinct color and icon to indicate the type of alert such as success, error, warning, or info.

    <component_props>
interface Props {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: ReactNode;
  description?: string;
  dismissLabel?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}
    </component_props>
    <component_example>
import { Alert } from '@/vibes/soul/primitives/alert'
import { useState } from 'react'

<Alert variant="success" message="1 item added to your cart" showAlert={showAlert} onClose={setShowAlert}/>
    </component_example>
  </component>

*/
