import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import { HiArrowDown, HiArrowUp, HiChevronDown, HiStar } from "react-icons/hi2";
import { Disclosure, Transition } from "@headlessui/react";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
const ProductDetail = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  return (
    // ! use carousal for all products of the category
    <div className="px-5 h-screen overflow-auto py-10">
      <BackButton></BackButton>
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="grid grid-cols-5 gap-x-">
        <div className="col-span-3 ">
          <img
            src={state.img}
            alt=""
            className="w-1/2 mx-auto shadow-nm rounded-xl"
          />
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quo nam, ab eveniet inventore quaerat neque consectetur perspiciatis commodi cupiditate fugiat alias dolores deserunt laudantium similique debitis sed tempore assumenda reiciendis facere dolorum culpa veritatis! Minima nam beatae iusto culpa blanditiis illo itaque impedit vel delectus obcaecati ipsam repellat quasi esse numquam accusantium tempore, illum earum quos pariatur? Quos nobis repudiandae ad pariatur reiciendis vitae aliquid dolores dolorum temporibus eius. Consequuntur similique autem illum ipsa totam atque fuga. Quod corrupti aut eaque. Aliquid, voluptate veniam magnam illum incidunt laudantium quas ex est, deserunt ratione porro, vitae animi amet dolor. Amet, odit. Exercitationem, in libero numquam atque eveniet deserunt quibusdam vel consectetur repudiandae placeat nemo illo! Veniam architecto cum perferendis provident, facilis quam culpa eos voluptatem rem! Impedit, quidem libero totam autem sint error aut iure. Assumenda saepe voluptates ab pariatur, nisi cumque placeat, reiciendis ex iusto commodi maiores ipsa error unde incidunt excepturi ratione reprehenderit officiis? Enim nam ad itaque asperiores amet deleniti quisquam blanditiis non ea voluptate odit possimus, iure assumenda voluptatibus inventore debitis porro neque quos a quo doloribus quibusdam at in est. Reiciendis dolorum ipsum distinctio exercitationem soluta mollitia, aperiam, eum modi saepe non voluptatem reprehenderit? Eos consectetur voluptatibus necessitatibus nesciunt, animi illo explicabo quasi ex non voluptas molestiae possimus fuga expedita. Architecto quasi voluptates quis dolor impedit, voluptas labore vitae quam voluptatem at illo aperiam est autem quas hic saepe optio, molestias, repudiandae veniam corporis exercitationem ex. Eius voluptate sapiente iusto debitis facere magnam eligendi ducimus est. Laborum dignissimos animi ex. Necessitatibus quisquam soluta quas cumque sequi fugit aliquam doloremque ipsa unde, est laborum dolores expedita, libero, ipsam ea? Exercitationem praesentium perferendis labore ratione reiciendis rem deleniti quae sit illum atque ullam animi ut delectus dolor perspiciatis adipisci nostrum ipsum quibusdam est amet nihil nemo, porro blanditiis! Culpa accusamus maiores, ipsum iure ipsa deserunt omnis necessitatibus aliquam facilis molestiae vitae animi voluptates in pariatur excepturi officia fugiat doloribus facere. Eum voluptate cumque adipisci vel suscipit! Voluptatum, ad perferendis tempora ratione odit iure maiores numquam enim reiciendis libero assumenda adipisci nihil totam, minima aspernatur voluptatibus beatae inventore? Molestias cupiditate facilis veritatis cum quia dignissimos alias vero, culpa minima vitae minus repellat. Quidem distinctio, veritatis consectetur adipisci fugiat minima nobis eos consequuntur magnam, fugit pariatur ullam temporibus soluta ipsa. Accusamus ex possimus, nobis tenetur non quidem maiores quod accusantium iure, consequuntur labore. Rem, tempora impedit molestiae magni ea asperiores id excepturi nam soluta numquam possimus, rerum saepe cupiditate accusantium eius veritatis eligendi! Quis delectus perferendis similique autem nesciunt tempora sapiente, ab doloribus dignissimos quod perspiciatis consequuntur, commodi recusandae iusto et possimus itaque excepturi veniam, cum totam cumque cupiditate ipsam magnam! Numquam minima id excepturi commodi repellat, reiciendis, dignissimos adipisci nisi placeat aliquam error minus autem animi amet? Ex laboriosam quasi asperiores et assumenda non totam modi dolor illum natus earum, fugit aliquam amet suscipit autem voluptatem rerum omnis consequuntur ratione tempore fugiat ad fuga ab sunt. Itaque ab atque ducimus maxime asperiores provident reiciendis quia est consequatur expedita eaque ad eius blanditiis assumenda commodi qui, deserunt quas, rem aperiam ipsum. Iure atque quos officiis asperiores pariatur a sunt optio necessitatibus blanditiis dolorem earum quasi, deserunt excepturi dignissimos dicta, nesciunt placeat. Sint rerum possimus esse tempora, neque molestiae voluptate tenetur sed qui repudiandae iste aspernatur impedit iusto, facilis officiis blanditiis libero distinctio consequuntur nisi quo natus nesciunt. Porro eos ipsum odit dolorem incidunt sit tenetur consectetur illo, fuga hic id est debitis adipisci aliquid voluptas vel beatae itaque quibusdam assumenda odio tempora reprehenderit sapiente quia? Explicabo, corrupti! Ullam sapiente voluptas, culpa provident non, magnam iste beatae placeat assumenda laboriosam dolor sint, rem suscipit incidunt omnis quibusdam reprehenderit perspiciatis asperiores numquam! Repellat laudantium qui, minima neque, illo natus architecto illum suscipit, fuga mollitia aperiam velit esse rem. Cupiditate fugit perspiciatis, modi, quidem soluta optio, assumenda exercitationem aspernatur explicabo culpa deleniti similique earum? Tenetur tempora maiores eveniet, ea sit est enim magni laborum! Provident, obcaecati. At nobis accusamus cum quo vel, repudiandae nesciunt minima doloribus nam autem similique ab exercitationem quod, voluptatem, necessitatibus voluptas non eligendi doloremque. Itaque eius cumque sequi eligendi harum. Placeat quam ea repudiandae. Repellendus, deserunt. Excepturi voluptate, quas deserunt minus illo qui velit id mollitia placeat incidunt, ex dicta quae sunt aliquam tempora quibusdam numquam similique quidem alias! Impedit, reiciendis reprehenderit asperiores esse culpa iure accusamus in voluptate nisi temporibus numquam possimus id, omnis voluptatum quam enim recusandae sit ipsam molestiae iusto, nobis eos facere nostrum quidem? Sint qui amet molestiae distinctio officiis accusamus inventore architecto, a eaque at consectetur et fugit optio pariatur laudantium eligendi voluptates impedit fugiat, nam sapiente rerum ipsum aspernatur! Quam, voluptatum ab! Nulla ipsum sint minima nobis fugiat? A possimus labore aut aliquid, obcaecati qui et harum iste deserunt unde sint perspiciatis sit in culpa repellat fugiat saepe iure dignissimos, atque dolore. Itaque, vero consectetur excepturi necessitatibus est pariatur odio ad et voluptatibus doloribus facere! Minus fuga, ex esse, facere vero perspiciatis minima debitis reiciendis corporis sit hic adipisci architecto iure obcaecati ipsum nobis perferendis. Quas dolores vero aut ipsam culpa neque molestiae, pariatur delectus labore nihil eveniet recusandae eos necessitatibus modi fuga. Consequuntur voluptas voluptatibus magnam rem ab delectus blanditiis reiciendis unde, dolorem consequatur ipsum, harum veritatis repellendus. Architecto cumque facilis expedita, dolorem, corrupti laudantium amet sint dolorum exercitationem optio voluptatem soluta? Molestiae corrupti dicta rem autem ut. Laudantium rerum voluptatum velit adipisci quia placeat nam? Repellendus, corporis inventore voluptatem earum nam itaque quasi suscipit deleniti sit. Nihil animi fuga excepturi dolores accusantium soluta magni nulla et natus ut vel ex, enim laboriosam libero ipsa possimus qui corporis aliquid labore. Corrupti, ducimus sequi? Impedit corporis dolorem iure alias, hic perferendis illo! Modi dignissimos distinctio ea quibusdam molestias asperiores! Deserunt quaerat laboriosam praesentium id reiciendis porro excepturi quidem velit eius quae tempore distinctio debitis quod non officia, rerum perspiciatis accusantium iure error incidunt hic amet sint! Unde maiores dolore, neque esse distinctio officiis consectetur sequi placeat amet, minus quo fugiat corporis facere dolores sit non ut possimus necessitatibus nisi aut est!
          </p> */}
        </div>
        <div className="col-span-2 shadow-nm rounded-md  p-10 ">
          <section className=" sticky top-0">
            <div className="flex justify-between ">
              <p className="">{state?.category}</p>
              <div className="flex items-center justify-center gap-x-2 mb-5">
                <div className="flex">
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                </div>
                <p className="font-semibold hover:underline cursor-pointer">
                  {state?.reviewsCount} Reviews
                </p>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold mb-5">{state?.name}</h2>
            <p className="font-bold mb-2">${state?.price}</p>
            <Disclosure>
              <hr className="border border-gray-300 mb-2" />

              <Disclosure.Button
                onClick={() => setOpen(!open)}
                className={
                  "w-full flex justify-between items-center gap-x-2 font-semibold"
                }
              >
                <span>Description</span>
                <HiChevronDown
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                ></HiChevronDown>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0 "
                enterTo="transform  opacity-100 "
                leave="transition duration-75 ease-out"
                leaveFrom="transform  opacity-100"
                leaveTo="transform opacity-0"
              >
                <Disclosure.Panel>
                  <p className="text-sm">{state?.description}</p>
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
            <hr className="border border-gray-300 mt-2 " />
            <p className="my-3 font-semibold">Sizes</p>
            <div className="w-full flex justify-between">
              {sizes.map((size, idx) => (
                <Button key={idx} classes={"w-20 "}>
                  {size}
                </Button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
