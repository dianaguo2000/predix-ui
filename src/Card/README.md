The `<Card/>` component consist of a header area and content area. The header can optionally contain a descriptive icon in the top left corner and/or an actions area in the top right corner for settings or other action icons. Cards are incredibly flexible in terms of what content can be placed in the main area of the card and how it's arranged.



```hint
Reference https://www.predix-ui.com/#/elements/cards/card/px-card
```

## Usage

```react
const { Card } = PxReact;
<div>
  <Card headerText='My Card'>
    This is the main content area of a Predix card.
  </Card>
</div>
```

### With loading

```react
state:
  loading: true
---
const { Card, Spinner } = PxReact;
const LoadingCard = (props) => {
  const {loading, children} = props;
  return (
    <Card headerText='Loading Card' loading>
      {!loading && children}
      {loading && <div className='flex flex--center'><Spinner size={75}/></div>}
    </Card>
  );
};

<LoadingCard loading={state.loading}>
  <p>This card should stop loading after a few seconds</p>
</LoadingCard>

```

### With custom CSS

```react
const { Card } = PxReact;
<div className='custom'>
  <style>{`
    .custom{
      --px-card-background-color: #fff;
      --px-card-border-color: #222;
      --px-card-header-color: #222;
    }
  `}</style>
  <Card headerText='My Card' icon='px-fea:analysis'>
    This is the main content area of a Predix card.
  </Card>
</div>
```

## Properties

```table
span: 6
rows:
  - Name: headerText
    Type: string
    Description: Text to be displayed in the header of the card.
  - Name: icon
    Type: string
    Description: Icon that appears to the left of the card header text. Should be a valid icon name from the Predix icon set.
  - Name: children
    Type: node
    Description: The children content.
```


### Styling
The following custom properties are available for styling:

```table
span: 6
rows:
  - Property: --px-view-header-background-color
    Default: null
    Description: Background color for the view header

  - Property: --px-headings-heading-subsection-color
    Default: null
    Description: Text color for the accordion header

  - Property: --px-headings-heading-subsection-background
    Default: null
    Description: Background color for the accordion header

  - Property: --px-card-background-color
    Default: null
    Description: Background color of the card

  - Property: --px-card-border-color
    Default: null
    Description: Border color for the top of the card

  - Property: --px-card-header-color
    Default: null
    Description: Color of the header text

  - Property: --px-card-icon-color
    Default: null
    Description: Color of the card's main icon'

  - Property: --px-card-action-icon-color
    Default: null
    Description: Color of icons in actions slot

  - Property: --px-card-action-icon-color--hover
    Default: null
    Description: Color of icons in actions slot when hovered

  - Property: --px-card-action-icon-color--pressed
    Default: null
    Description: Color of icons in actions slot when pressed

```
