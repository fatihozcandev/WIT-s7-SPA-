import React, { useState } from "react";
import "./SiparisForm.css";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const materials = [
  "Pepperoni",
  "Sosis",
  "Domates",
  "Biber",
  "Mısır",
  "Sucuk",
  "Kanada Jambonu",
  "Ananas",
  "Tavuk Izgara",
  "Jalepeno",
  "Kabak",
  "Soğan",
  "Sarımsak",
];
const pizzaBoyu = ["Küçük", "Orta", " Büyük"];
const hamurKalinligi = ["Çok İnce", "İnce", "Normal", "Kalın", "Peynirli"];

const initialValues = {
  size: "",
  paste: "",
  material: [],
  name: "",
  note: "",
  count: 1,
};

const initialErrors = {
  name: true,
  material: true,
  size: false,
  paste: false,
};

const SiparisForm = () => {
  const [formdata, setFormData] = useState([initialValues]);
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);

  const clickHandler = (event) => {
    const { name, id, value } = event.target;
    if (name === "minus") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else if (name === "plus") {
      setQuantity(quantity + 1);
    }
    if (name === "order") {
      history.push("/approval");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const [name, value] = event.target;
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="pizza-description">
        <h2>Position Absulute Acı Pizza</h2>
        <div className="price-details">
          <h3>85.50₺</h3>
          <p>4.9</p>
          <p>(200)</p>
        </div>
        <p>
          Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
      </FormGroup>
      <FormGroup row tag="fieldset" className="boyut-radio">
        <legend className="col-form-label col-sm-2">Radio Buttons</legend>
        <Col sm={10}>
          {pizzaBoyu.map((boyut) => {
            return (
              <FormGroup check>
                <Input name="materials" type="radio" />{" "}
                <Label check>{boyut}</Label>
              </FormGroup>
            );
          })}
        </Col>
      </FormGroup>
      <FormGroup row className="hamur-select">
        <Label for="exampleSelect" sm={2}>
          Hamur Seç
        </Label>
        <Col sm={10}>
          <Input id="exampleSelect" name="select" type="select">
            {hamurKalinligi.map((kalinlik) => {
              return <option> {kalinlik}</option>;
            })}
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row className="material-check">
        <Label for="material" sm={2}>
          Ek Malzemeler
        </Label>
        <Col
          sm={{
            size: 10,
          }}
        >
          <FormGroup check>
            {materials.map((material) => {
              return (
                <Label
                  check
                  sm={{
                    size: 5,
                  }}
                >
                  <Input id="mateial" type="checkbox" /> {material}
                </Label>
              );
            })}
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="siparis-notu">
        <Label for="exampleText" sm={2}>
          Sipariş Notu:
        </Label>
        <Col sm={10}>
          <Input
            id="exampleText"
            name="text"
            type="textarea"
            placeholder="Sipariş notunuzu ekleyebilirsiniz"
          />
        </Col>
      </FormGroup>
      <FormGroup className="quantity-group">
        <CardGroup>
          <Button name="minus" color="warning" onClick={clickHandler}>
            -
          </Button>

          <FormText>{"  " + quantity + "  "}</FormText>

          <Button name="plus" color="warning" onClick={clickHandler}>
            +
          </Button>
        </CardGroup>
      </FormGroup>
      <FormGroup className="siparis-ozeti" check row>
        <Card>
          <CardBody>Buraya sipariş toplamı detayları gelecek</CardBody>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button name="order" color="warning" onClick={clickHandler}>
              Sipariş ver
            </Button>
          </Col>
        </Card>
      </FormGroup>
    </Form>
  );
};

export default SiparisForm;
