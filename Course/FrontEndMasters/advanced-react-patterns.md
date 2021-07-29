# Advanced React Patterns

> [FrontEnd Masters: Advanced React Patterns](https://frontendmasters.com/courses/advanced-react-patterns/) 수강후 정리한 글. 강의 예제는 class형 컴포넌트로 되어있는데 Functional 컴포넌트로 예제를 수정해 정리함

## Compound Components

### Compound Components (Basic)

사용하는 측에서 컴포넌트를 조합해서 사용하도록 한다. 컴포넌트의 재사용성을 높힌다.

- Usage
    ```jsx
    const Usage = ({onToggle = (on) => console.log('toggle:' + on)}) => {
      return (
        <Toggle onToggle={onToggle}>
          <Toggle.On>The button is on</Toggle.On>
          <Toggle.Off>The button is off</Toggle.Off>
          <Toggle.Button />
        </Toggle>
      );
    }
    ```

- Implementation

    ```jsx
    const Toggle = (props) => {
      const [on, setOn] = useState(false);
      const toggle = () => setOn(prev => !prev);
      useEffect(() => props.onToggle(on), [on]);

      return React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          on,
          toggle,
        });
      });
    }

    Toggle.On = (props) => {
      return props.on ? props.children : null;
    }
    Toggle.Off = (props) => {
      return props.on ? null : props.children;
    }
    Toggle.Button = (props) => {
      return <Switch on={props.on} onClick={props.toggle}/>;
    }
    ```

### Compound Component (Context API)

Context API 를 이용하는 방법

- Usage

    ```jsx
    const Usage = ({onToggle = (on) => console.log('toggle:' + on)}) => {
      return (
        <Toggle onToggle={onToggle}>
          <Toggle.On>The button is on</Toggle.On>
          <Toggle.Off>The button is off</Toggle.Off>
          <div>
            <Toggle.Button />
          </div>
        </Toggle>
      );
    }
    ```

- Implementation

    ```jsx
    const ToggleContext = React.createContext({on: false, toggle: () => {}});

    const Toggle = (props) => {
      const [on, setOn] = useState(false);
      const toggle = () => setOn(prev => !prev);
      useEffect(() => props.onToggle(on), [on]);

      return <ToggleContext.Provider value={{on, toggle}}>
        {props.children}
      </ToggleContext.Provider>;
    }

    Toggle.On = (props) => <ToggleContext.Consumer>
      {({on}) => (on ? props.children : null)}
    </ToggleContext.Consumer>;

    Toggle.Off = (props) => <ToggleContext.Consumer>
      {({on}) => (on ? null : props.children)}
    </ToggleContext.Consumer>;

    Toggle.Button = (props) => <ToggleContext.Consumer>
      {({on, toggle}) => <Switch  {...props} on={on} onClick={toggle} />}
    </ToggleContext.Consumer>
    ```

## Render Props

## Controlling State

## Provider Pattern
