// "use client";

// import { FontAwesome } from "@react-icons/all-files/fa/FontAwesome";
// import { Ionicons } from "@react-icons/all-files/io5/IoListOutline";
// import { useRouter } from "next/navigation";
// import styled from "styled-components";

// export default function CourseCard({ item }: { item: CoursesType }) {
//   const router = useRouter();

//   return (
//     <Card onClick={() => router.push(`/course-details?item=${encodeURIComponent(JSON.stringify(item))}`)}>
//       <ImageContainer>
//         <Thumbnail src={item.thumbnail.url} alt={item.name} />
//       </ImageContainer>
//       <Content>
//         <Title>{item.name}</Title>
//         <Row>
//           <RatingContainer>
//             <FontAwesome icon="star" size={14} color={"#ffb800"} />
//             <RatingText>{item?.ratings}</RatingText>
//           </RatingContainer>
//           <StudentCount>{item.purchased} Students</StudentCount>
//         </Row>
//         <Row>
//           <PriceContainer>
//             <Price>${item?.price}</Price>
//             <EstimatedPrice>${item?.estimatedPrice}</EstimatedPrice>
//           </PriceContainer>
//           <LectureContainer>
//             <Ionicons size={20} color={"#8A8A8A"} />
//             <LectureText>{item.courseData.length} Lectures</LectureText>
//           </LectureContainer>
//         </Row>
//       </Content>
//     </Card>
//   );
// }

// // Styled Components
// const Card = styled.div`
//   background-color: #fff;
//   border-radius: 12px;
//   width: 95%;
//   max-width: 400px;
//   overflow: hidden;
//   margin: 15px auto;
//   padding: 8px;
//   cursor: pointer;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

// const ImageContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Thumbnail = styled.img`
//   width: 100%;
//   height: 220px;
//   object-fit: cover;
//   border-radius: 5px;
// `;

// const Content = styled.div`
//   padding: 10px;
// `;

// const Title = styled.h3`
//   font-size: 14px;
//   text-align: left;
//   margin-top: 10px;
//   font-family: "Raleway", sans-serif;
//   font-weight: 600;
// `;

// const Row = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 10px;
// `;

// const RatingContainer = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #141517;
//   padding: 4px 10px;
//   border-radius: 5px;
// `;

// const RatingText = styled.span`
//   color: white;
//   font-size: 14px;
//   margin-left: 5px;
// `;

// const StudentCount = styled.span`
//   font-size: 14px;
//   color: #333;
// `;

// const PriceContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Price = styled.span`
//   font-size: 18px;
//   font-weight: 600;
// `;

// const EstimatedPrice = styled.span`
//   font-size: 16px;
//   font-weight: 400;
//   text-decoration: line-through;
//   margin-left: 5px;
//   color: gray;
// `;

// const LectureContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const LectureText = styled.span`
//   margin-left: 5px;
//   font-size: 14px;
// `;

