import React, { useEffect, useState } from "react";
import "./SiparisForm.css";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";

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
  hamur: "",
  material: [],
  name: "",
  note: "",
};

const initialErrors = {
  name: false,
  material: true,
  size: false,
  paste: false,
};

const errorMesages = {
  name: "",
  material: "En az 4, en fazla 10 ürün seçmelisiniz.",
  size: "Pizza boyunu seçiniz",
  paste: "Hamur tipini seçiniz",
};

const SiparisForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

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
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name == "note") {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "size" && checked) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "material") {
      let updatedMaterials = [...formData.material]; // Mevcut malzemelerin bir kopyasını alın

      if (checked) {
        updatedMaterials.push(value); // Seçilen malzemeyi ekle
      } else {
        updatedMaterials = updatedMaterials.filter(
          (material) => material !== value
        ); // Seçilmeyen malzemeyi filtrele
      }

      const updatedForm = {
        ...formData,
        [name]: updatedMaterials, // Malzemelerin güncellenmiş listesini formData'ya ata
      };

      setFormData(updatedForm); // formData'yı güncelle
    }
    if (name == "hamur") {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/pizza", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
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
      <FormGroup className="hamur-boyut">
        <FormGroup row tag="fieldset" className="boyut-radio">
          <legend className="col-form-label col-sm-2">Radio Buttons</legend>
          <Col sm={3}>
            {pizzaBoyu.map((boyut) => {
              return (
                <FormGroup check>
                  <Input
                    key={boyut}
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value={boyut}
                    checked={formData.size === boyut}
                  />{" "}
                  <Label for="size" check>
                    {boyut}
                  </Label>
                </FormGroup>
              );
            })}
          </Col>
        </FormGroup>

        <FormGroup row className="hamur-select">
          <Label for="hamur" sm={2}>
            Hamur Seç
          </Label>
          <Col sm={3}>
            <Input name="hamur" type="select" onChange={handleChange}>
              {hamurKalinligi.map((kalinlik) => {
                return <option> {kalinlik}</option>;
              })}
            </Input>
          </Col>
        </FormGroup>
      </FormGroup>
      <FormGroup row className="material-check">
        <Label for="material" sm={2}>
          Ek Malzemeler
        </Label>
        <Col sm={10}>
          <FormGroup check>
            {materials.map((material) => {
              return (
                <Label check sm={5} for="material">
                  {/* buraya checkboxa margin  ekle 
                ve 
                text alignı iptal et 
                */}
                  <Input
                    name="material"
                    type="checkbox"
                    onChange={handleChange}
                    value={material}
                    checked={formData.material.includes(material)}
                  />
                  {material}
                </Label>
              );
            })}
            <FormFeedback>
              {errors.material && (
                <p className="formFeedback">{errorMesages.material}</p>
              )}
            </FormFeedback>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="siparis-notu">
        <Label for="note" sm={2}>
          Sipariş Notu:
        </Label>
        <Col sm={10}>
          <Input
            name="note"
            type="textarea"
            placeholder="Sipariş notunuzu ekleyebilirsiniz"
            onChange={handleChange}
            value={formData.note}
          />
        </Col>
      </FormGroup>
      <FormGroup className="quantity-group">
        <CardGroup>
          <Label> Adet</Label>

          <Button
            type="button"
            name="minus"
            color="warning"
            onClick={clickHandler}
          >
            -
          </Button>
          <Col xs={1}>
            <FormText sm={2}>{quantity}</FormText>
          </Col>

          <Button
            type="button"
            name="plus"
            color="warning"
            onClick={clickHandler}
          >
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
          ></Col>

          <Button
            name="order"
            color="warning"
            type="submit"
            onClick={clickHandler}
          >
            Sipariş ver
          </Button>
        </Card>
      </FormGroup>
    </Form>
  );
};

export default SiparisForm;
