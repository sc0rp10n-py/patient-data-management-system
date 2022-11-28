const handler = (req, res) => {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    let c = a.toString() + "+" + b.toString();
    return res.status(200).json({
        url: `https://latex.codecogs.com/gif.latex?%5Cinline%20%5Cdpi%7B200%7D%20%5Cbg_white%20%5Cfn_phv%20%5Chuge%20${c}`,
        s: c,
        data: a + b,
    });
}

export default handler;